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

  // Check roomId: '/room/:roomId'
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

  // Check ping/pong
  ws.isAlive = true;
  ws.on('pong', () => {
    this.isAlive = true;
  });
};


module.exports.healthCheckPing = wss => (
  () => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping(() => {
      });
    });
  }
);


module.exports.broadcastRoom = (wss, roomId, msg) => {
  wss.clients.forEach((client) => {
    if (client.roomId === roomId && client.token) {
      client.send(msg);
    }
  });
};
