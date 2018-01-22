const aws = require('aws-sdk');
const _ = require('lodash');
const { getTtl } = require('./utils');
const { broadcastRoom } = require('./broadcastWs');

const docClient = new aws.DynamoDB.DocumentClient();


module.exports.getRoomList = (req, res, next) => {
  Promise.all([
    docClient.scan({
      TableName: 'Room',
      ProjectionExpression: 'id, eastId, westId',
    }).promise(),
    _.countBy(Array.from(req.wss.clients), ws => ws.roomId),
  ])
    .then(([data, roomCounter]) => {
      if (data.Count <= 0) {
        res.send([]);
      } else {
        res.send(_.map(data.Items, (room) => {
          room.count = roomCounter[room.id] || 0;
          return room;
        }));
      }
    })
    .catch(next);
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
        eastId: null,
        westId: null,
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
    .catch(next);
};


module.exports.updateRoom = (req, res, next) => {
  const { roomId } = req.params;
  const AttributeUpdates = {
    cacheTtl: {
      Action: 'PUT',
      Value: getTtl(),
    },
  };

  if (req.body.bidSeq) {
    AttributeUpdates.bidSeq = {
      Action: 'PUT',
      Value: JSON.stringify(req.body.bidSeq),
    };
  }
  if (req.body.eastId !== undefined) {
    AttributeUpdates.eastId = {
      Action: 'PUT',
      Value: req.body.eastId,
    };
  }
  if (req.body.westId !== undefined) {
    AttributeUpdates.westId = {
      Action: 'PUT',
      Value: req.body.westId,
    };
  }

  docClient.update({
    TableName: 'Room',
    Key: {
      id: roomId,
    },
    AttributeUpdates,
    ReturnValues: 'ALL_NEW',
  }).promise()
    .then((data) => {
      broadcastRoom(req.wss, roomId, JSON.stringify(data.Attributes));
      res.sendStatus(200);
    })
    .catch(next);
};
