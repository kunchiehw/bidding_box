require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const websocket = require('ws');
const aws = require('aws-sdk');
const { authenticateUser, validateJwtMiddleware, getTtl } = require('./lib/utils');
const broadcastWs = require('./lib/broadcastWs');


// Server Config
const docClient = new aws.DynamoDB.DocumentClient();
const app = express();
const server = http.createServer(app);
const wss = new websocket.Server({
  server,
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use(bodyParser.json());

server.listen(8080, () => {
  console.log('Listening on %d', server.address().port);
});


// WebSocket define
wss.on('connection', broadcastWs.onConnect);


// API define
app.post(
  '/token',
  (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }

    const { username, password } = req.body;

    authenticateUser(username, password)
      .then((token) => {
        console.log(`${username} get jwt`);
        res.send(token);
      })
      .catch(() => {
        res.sendStatus(400);
      });
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
  validateJwtMiddleware,
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
          cacheTtl: getTtl(),
          bidSeq: '[]',
          roomInfo: {
            eastID: 'jarron',
            westID: 'wkc',
          },
          boardInfo: JSON.stringify({
            vulnerability: 'NS',
            dealer: 'WEST',
            eastHand: {
              SPADES: 'AKQJT98765432',
              HEARTS: '',
              DIAMONDS: '',
              CLUBS: '',
            },
            westHand: {
              SPADES: '',
              HEARTS: 'KQJT9',
              DIAMONDS: 'KQJT',
              CLUBS: 'KQJT',
            },
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
          }),
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
  validateJwtMiddleware,
  bodyParser.json(),
  (req, res, next) => {
    const { roomId } = req.params;
    const bidSeq = JSON.stringify(req.body.bidSeq);
    docClient.update({
      TableName: 'Room',
      Key: {
        id: roomId,
      },
      UpdateExpression: 'set bidSeq = :b, cacheTtl = :t',
      ExpressionAttributeValues: {
        ':b': bidSeq,
        ':t': getTtl(),
      },
      ReturnValues: 'ALL_NEW',
    }).promise()
      .then(() => {
        broadcastWs.broadcastRoom(wss, roomId, JSON.stringify({ bidSeq }));
        res.sendStatus(200);
      })
      .catch(err => next(err));
  },
);
