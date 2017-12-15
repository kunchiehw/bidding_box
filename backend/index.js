const express = require('express');
const http = require('http');
const url = require('url');
const websocket = require('ws');
const jwt = require('jsonwebtoken');

const secret = 'shhhhhhared-secret';
const db = {
  users: {
    wkc: 'password',
    jarron: 'password',
  },
  rooms: {},
};
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
        cb(false, 401, 'Unauthorized');
      }

      if (!('username' in decoded) || !(decoded.username in db.users)) {
        cb(false, 401, 'Unauthorized');
      }
      info.req.user = decoded;
      cb(true);
    });
  },
});


// API
app.get(
  '/token',
  (req, res) => {
    const token = jwt.sign({ username: 'wkc' }, secret, { expiresIn: '1h' });
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

  if (room in db) {
    ws.send(db[room]);
  } else {
    db[room] = '[]';
  }

  ws.on('message', (message) => {
    db[room] = message;
    console.log(`${room} received: ${message}`);
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
