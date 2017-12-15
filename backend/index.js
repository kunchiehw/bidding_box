const express = require('express');
const http = require('http');
const url = require('url');
const websocket = require('ws');

const app = express();

app.use((req, res) => {
  res.send({ msg: 'hello' });
});

const server = http.createServer(app);
const wss = new websocket.Server({ server });


wss.on('connection', (ws, req) => {
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  const location = url.parse(req.url, true);
  if (!location.path.startsWith('/room/')) {
    return ws.terminate();
  }
  const room = location.path;
  ws.room = room;

  ws.on('message', (message) => {
    console.log('received: %s', message);
    wss.clients.forEach((client) => {
      if (client.room === room) {
        client.send(room);
      }
    });
  });

  ws.send('get in the room: ');
});

server.listen(8080, () => {
  console.log('Listening on %d', server.address().port);
});
