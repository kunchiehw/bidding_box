require('dotenv').config();
const request = require('supertest');
const should = require('should');
const WebSocket = require('ws');
const { server } = require('../index');


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

    describe('POST /token', () => {
      it('200', (done) => {
        request(server)
          .post('/token')
          .send(auth)
          .expect(200, done);
      });

      // it('400', (done) => {
      //   request(server)
      //     .post('/token')
      //     .set('Content-Type', 'text/plain')
      //     .send('abc')
      //     .expect(400, done);
      // });

      it('401', (done) => {
        request(server)
          .post('/token')
          .send({ username: 'a' })
          .expect(401, done);
      });
    });
  });

  describe('websocket', () => {
    let token = null;
    let ws = null;
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

    afterEach(() => {
      ws.close();
    });

    it('Close /', (done) => {
      ws = new WebSocket(`${wsUrl}/`);

      ws.on('open', () => {
        ws.send(token);
      });

      ws.on('close', () => {
        done();
      });
    });

    it('Connect /room/:roomId', (done) => {
      ws = new WebSocket(`${wsUrl}/room/test`);

      ws.on('open', () => {
        ws.send(token);
      });

      ws.on('message', (data) => {
        should.exist(data);
        done();
      });
    });

    it('Close /room/undefined', (done) => {
      ws = new WebSocket(`${wsUrl}/room/undefined`);

      ws.on('open', () => {
        ws.send(token);
      });

      ws.on('close', () => {
        done();
      });
    });

    // it('Connect /lobby', (done) => {
    //   ws = new WebSocket(`${wsUrl}/lobby`);
    //
    //   ws.on('open', () => {
    //     ws.send(token);
    //   });
    //
    //   ws.on('message', (data) => {
    //     should.exist(data);
    //     done();
    //   });
    // });
  });
});
