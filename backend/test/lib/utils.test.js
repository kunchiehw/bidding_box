require('dotenv').config();
const should = require('should');
const utils = require('../../lib/utils');

const username = 'jarron';
const password = 'password';

describe('utils.js', () => {
  describe('authenticateUser', () => {
    describe('good cases', () => {
      it('login success', (done) => {
        utils.authenticateUser(username, password)
          .then((token) => {
            should.exist(token);
            done();
          });
      });
    });

    describe('bad cases', () => {
      it('login fail', (done) => {
        utils.authenticateUser(username, null)
          .catch(() => {
            done();
          });
      });
    });
  });
});
