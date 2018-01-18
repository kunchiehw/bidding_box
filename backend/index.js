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
};


const docClient = new aws.DynamoDB.DocumentClient();
const app = express();
const server = http.createServer(app);
const wss = new websocket.Server({
  server,
});


// Utils
function authenticateRequest(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err || !decoded) {
        reject();
      }

      if (!('username' in decoded) || !(decoded.username in db.users)) {
        reject();
      }

      resolve(token);
    });
  });
}


// API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
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
    if (!username || !password || !(username in db.users) || db.users[username] !== password) {
      return res.sendStatus(403);
    }

    const token = jwt.sign({ username }, secret, { expiresIn: '30d' });

    console.log(`${username} get jwt`);
    res.send(token);
  },
);


app.get(
  '/room',
  (req, res, next) => {
    docClient.scan({
      TableName: 'Room',
      ProjectionExpression: 'id, roomInfo',
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


app.post(
  '/room/:roomId',
  // TODO: check jwt
  (req, res, next) => {
    const { roomId } = req.params;
    docClient.get({
      TableName: 'Room',
      Key: {
        id: roomId,
      },
    }).promise()
      .then((data) => {
        if (data.Item) {
          throw new Error('');
        }

        const defaultItem = {
          id: roomId,
          bidSeq: '[]',
          ttl: Math.floor(Date.now() / 1000) + (4 * 60 * 60), // ttl for 4 hour
          roomInfo: {},
        };

        return docClient.put({
          TableName: 'Room',
          Item: defaultItem,
        }).promise();
      })
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  },
);


app.put(
  '/room/:roomId',
  // TODO: check jwt
  bodyParser.json(),
  (req, res, next) => {
    const { roomId } = req.params;
    const bidSeq = JSON.stringify(req.body.bidSeq);
    docClient.update({
      TableName: 'Room',
      Key: {
        id: roomId,
      },
      UpdateExpression: 'set bidSeq = :b',
      ExpressionAttributeValues: {
        ':b': bidSeq,
      },
      ReturnValues: 'ALL_NEW',
    }).promise()
      .then(() => {
        wss.clients.forEach((client) => {
          if (client.roomId === roomId && client.token) {
            client.send(JSON.stringify({ bidSeq }));
          }
        });
        res.sendStatus(200);
      })
      .catch(err => next(err));
  },
);


// WebSocket
wss.on('connection', (ws, req) => {
  // Check url
  const location = url.parse(req.url, true);
  if (!location.path.startsWith('/room/')) {
    return ws.close();
  }

  // Check roomId
  const roomId = location.pathname.substring(6);
  ws.roomId = roomId;

  // Check auth
  ws.on('message', (token) => {
    authenticateRequest(token)
      .then(() => {
        if (ws.roomId) {
          ws.token = token;
          docClient.get({
            TableName: 'Room',
            Key: {
              id: roomId,
            },
          }).promise()
            .then((data) => {
              if (!data.Item) {
                throw new Error();
              }
              ws.send(JSON.stringify(data.Item));
            });
        }
      })
      .catch(() => {
        ws.close();
      });
  });
});


server.listen(8080, () => {
  console.log('Listening on %d', server.address().port);
});
