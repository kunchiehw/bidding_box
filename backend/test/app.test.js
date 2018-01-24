require('dotenv').config();
const request = require('supertest');
const { server } = require('../index');
const WebSocket = require('ws');

const auth = { username: 'unittest', password: 'password' };


describe('loading express', () => {
  // after((done) => {
  //   server.close(done);
  // });

  describe('RESTful', () => {
    it('GET /', (done) => {
      request(server)
        .get('/')
        .expect(200, done);
    });

    it('404 everything else', (done) => {
      request(server)
        .get('/foo/bar')
        .expect(404, done);
    });

    it('POST /token', (done) => {
      request(server)
        .post('/token')
        .send(auth)
        .expect(200, done);
    });

    it('POST /token', (done) => {
      request(server)
        .post('/token')
        .send(auth)
        .expect(200, done);
    });
  });

  describe('websocket', () => {
    let token = null;
    const wsUrl = `ws://localhost:${process.env.PORT || 8080}`;

    before((done) => {
      request(server)
        .post('/token')
        .send(auth)
        .then((res) => {
          token = res.text;
          request(server)
            .post('/room/test')
            .set('Authorization', `Bearer ${token}`)
            .then(() => {
              done();
            });
        });
    });

    it('/room/:roomId', (done) => {
      const ws = new WebSocket(`${wsUrl}/room/test`);

      ws.on('open', () => {
        ws.send(token);
      });

      ws.on('message', (data) => {
        done();
      });
    });
  });
});
