const aws = require('aws-sdk');
const _ = require('lodash');

const { getTtl, generateNSNextBid } = require('./utils');
const { broadcastRoom } = require('./broadcastWs');
const { getBoard } = require('./boardInfoExamples');

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
        res.sendStatus(200);
        return Promise.reject();
      }
      const boardInfo = getBoard();
      const boardInfoObj = JSON.parse(boardInfo);
      const bidSeqObj = [];
      const nsNextBid = generateNSNextBid(boardInfoObj.dealer, bidSeqObj, boardInfoObj.nsActions);
      if (nsNextBid) {
        bidSeqObj.push(nsNextBid);
      }

      const defaultItem = {
        id: roomId,
        cacheTtl: getTtl(),
        bidSeq: JSON.stringify(bidSeqObj),
        eastId: null,
        westId: null,
        boardInfo,
      };

      return docClient.put({
        TableName: 'Room',
        Item: defaultItem,
      }).promise();
    })
    .then(() => res.sendStatus(202))
    .catch(next);
};


module.exports.updateRoom = (req, res, next) => {
  const { roomId } = req.params;

  docClient.get({
    TableName: 'Room',
    Key: {
      id: roomId,
    },
  }).promise()
    .then((data) => {
      const boardInfo = JSON.parse(data.Item.boardInfo);
      if (!boardInfo) {
        res.sendStatus(400);
        return Promise.reject();
      }

      const AttributeUpdates = {
        cacheTtl: {
          Action: 'PUT',
          Value: getTtl(),
        },
      };

      if (req.body.bidSeq !== undefined) {
        const bidSeqObj = JSON.parse(req.body.bidSeq);
        const nsNextBid = generateNSNextBid(boardInfo.dealer, bidSeqObj, boardInfo.nsActions);

        if (nsNextBid) {
          bidSeqObj.push(nsNextBid);
        }
        AttributeUpdates.bidSeq = {
          Action: 'PUT',
          Value: JSON.stringify(bidSeqObj),
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

      return docClient.update({
        TableName: 'Room',
        Key: {
          id: roomId,
        },
        AttributeUpdates,
        ReturnValues: 'ALL_NEW',
      }).promise();
    })
    .then((data) => {
      broadcastRoom(req.wss, roomId, JSON.stringify(data.Attributes));
      res.sendStatus(200);
    })
    .catch(next);
};
