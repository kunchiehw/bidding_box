const aws = require('aws-sdk');
const { getTtl } = require('./utils');
const { broadcastRoom } = require('./broadcastWs');

const docClient = new aws.DynamoDB.DocumentClient();


module.exports.getRoomList = (req, res, next) => {
  Promise.all([
    docClient.scan({
      TableName: 'Room',
      ProjectionExpression: 'id, roomInfo',
    }).promise(),
  ])
    .then(([data]) => {
      if (data.Count > 0) {
        res.send(data.Items);
      } else {
        res.send([]);
      }
    })
    .catch(err => next(err));
};


module.exports.createRoom = (req, res, next) => {
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
};


module.exports.updateRoom = (req, res, next) => {
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
      broadcastRoom(req.wss, roomId, JSON.stringify({ bidSeq }));
      res.sendStatus(200);
    })
    .catch(err => next(err));
};
