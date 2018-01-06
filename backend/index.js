require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const url = require('url');
const websocket = require('ws');
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');


const secret = process.env.SHARE_SECRET;
const db = {
  users: {
    wkc: 'password',
    jarron: 'password',
  },
  rooms: {},
};
const boardInfo = {
  vulnerability: 'NS',
  dealer: 'NORTH',
  eastHand: ['AKQJT98765432', '', '', ''],
  westHand: ['', 'KQJT9', 'KQJT', 'KQJT'],
  scoreList: [{
    bid: {
      level: 7,
      suit: 'SPADES',
    },
    declarer: 'EW',
    score: 100,
  }, {
    bid: {
      level: 7,
      suit: 'NOTRUMPS',
    },
    declarer: 'EAST',
    score: 0,
  }],
};

const docClient = new aws.DynamoDB.DocumentClient();
const app = express();
const server = http.createServer(app);
const wss = new websocket.Server({
  server,
  verifyClient(info, cb) {
    const location = url.parse(info.req.url, true);
    const jwtToken = location.query.jwt;
    if (!jwtToken) { cb(false, 401, 'Unauthorized'); }

    jwt.verify(jwtToken, secret, (err, decoded) => {
      if (err || !decoded) {
        return cb(false, 401, 'Unauthorized');
      }

      if (!('username' in decoded) || !(decoded.username in db.users)) {
        return cb(false, 401, 'Unauthorized');
      }
      info.req.user = decoded;
      cb(true);
    });
  },
});


// API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.post(
  '/token',
  bodyParser.json(),
  (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password || !(username in db.users)) {
      return res.sendStatus(403);
    }

    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
    res.send(token);
  },
);


app.get(
  '/room',
  (req, res, next) => {
    docClient.scan({
      TableName: 'Room',
      ProjectionExpression: 'id',
    }).promise()
      .then((data) => {
        if (data.Count > 0) {
          res.send(data.Items);
        } else {
          res.send([]);
        }
      })
      .catch(err => next(err));
  },
);


// WebSocket
wss.on('connection', (ws, req) => {
  // TODO: You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  const location = url.parse(req.url, true);
  if (!location.path.startsWith('/room/')) {
    return ws.close();
  }
  const room = location.pathname.substring(6);
  ws.room = room;
  console.log(`${req.user.username} get in the room: ${room}`);

  docClient.get({
    TableName: 'Room',
    Key: {
      id: room,
    },
  }).promise()
    .then((data) => {
      if (data.Item) {
        ws.send(data.Item.bidSeq);
      } else {
        docClient.put({
          TableName: 'Room',
          Item: {
            id: room,
            bidSeq: '[]',
            ttl: Math.floor(Date.now() / 1000) + (4 * 60 * 60), // ttl for 4 hour
            roomInfo: {
              eastID: null,
              westID: null,
            },
            boardInfo,
          },
        }, () => {
          ws.send('[]');
        });
      }
    });

  ws.on('message', (message) => {
    console.log(`${room} received: ${message}`);
    docClient.update({
      TableName: 'Room',
      Key: {
        id: room,
      },
      UpdateExpression: 'set bidSeq = :b',
      ExpressionAttributeValues: {
        ':b': message,
      },
      ReturnValues: 'UPDATED_NEW',
    });

    wss.clients.forEach((client) => {
      if (client.room === room) {
        client.send(message);
      }
    });
  });
});


server.listen(8080, () => {
  console.log('Listening on %d', server.address().port);
});
