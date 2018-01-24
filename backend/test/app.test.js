const request = require('supertest');
const { server } = require('../index');

const auth = { username: 'unittest', password: 'password' };


describe('loading express', () => {
  after((done) => {
    server.close(done);
  });

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
});
