const url = require('url');
const { validateJwt } = require('./utils');
const aws = require('aws-sdk');

const docClient = new aws.DynamoDB.DocumentClient();


module.exports.onConnect = (ws, req) => {
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
    validateJwt(token)
      .then(() => {
        if (ws.roomId) {
          ws.token = token;
          return docClient.get({
            TableName: 'Room',
            Key: {
              id: roomId,
            },
          }).promise();
        }
        return Promise.resolve(null);
      })
      .then((data) => {
        if (!(data && data.Item)) {
          throw new Error();
        }
        ws.send(JSON.stringify(data.Item));
      })
      .catch((err) => {
        console.log(`websocket close: ${err}`);
        ws.close();
      });
  });
};
