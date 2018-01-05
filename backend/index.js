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


// WebSocket
wss.on('connection', (ws, req) => {
  // You might use location.query.access_token to authenticate or share sessions
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
      console.log(data);
      if (data.Item) {
        ws.send(data.Item.bidSeq);
      } else {
        docClient.put({
          TableName: 'Room',
          Item: {
            id: room,
            bidSeq: '[]',
          },
        }, () => {
          ws.send('[]');
        });
      }
    })
    .catch((err) => {
      console.log(err);
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
    }, (err, data) => {
      console.log(err);
      console.log(data);
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
