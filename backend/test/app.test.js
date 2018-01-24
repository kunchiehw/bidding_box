const request = require('supertest');
const { server } = require('../index');

describe('loading express', () => {
  after((done) => {
    server.close(done);
  });

  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});
