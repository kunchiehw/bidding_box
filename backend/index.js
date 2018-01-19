require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const websocket = require('ws');

const morgan = require('morgan');
const broadcastWs = require('./lib/broadcastWs');
const { authenticateUserMiddleware, validateJwtMiddleware } = require('./lib/utils');
const { getRoomList, createRoom, updateRoom } = require('./lib/room');


// Server Config

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
app.use(morgan('dev'));

server.listen(8080, () => {
  console.log('Listening on %d', server.address().port);
});


// WebSocket define
wss.on('connection', broadcastWs.onConnect);


// API define
app.post(
  '/token',
  authenticateUserMiddleware,
);


app.get(
  '/room',
  getRoomList,
);


app.post(
  '/room/:roomId',
  validateJwtMiddleware,
  createRoom,
);


app.put(
  '/room/:roomId',
  validateJwtMiddleware,
  bodyParser.json(),
  updateRoom(wss),
);
