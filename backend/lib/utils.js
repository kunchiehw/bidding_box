const jwt = require('jsonwebtoken');

const secret = process.env.SHARE_SECRET;
const db = {
  users: {
    wkc: 'password',
    jarron: 'password',
  },
};


function authenticateUser(username, password) {
  return new Promise((resolve, reject) => {
    if (!username || !password || !(username in db.users) || db.users[username] !== password) {
      return reject();
    }

    const token = jwt.sign({ username }, secret, { expiresIn: '30d' });
    return resolve(token);
  });
}
module.exports.authenticateUser = authenticateUser;


function validateJwt(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err || !decoded) {
        reject();
      }

      if (!('username' in decoded) || !(decoded.username in db.users)) {
        reject();
      }

      resolve(token);
    });
  });
}
module.exports.validateJwt = validateJwt;


module.exports.validateJwtMiddleware = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];
    validateJwt(token)
      .then(() => next())
      .catch(() => next(new Error('Unauthorized')));
  } else {
    next(new Error('Unauthorized'));
  }
};


module.exports.getTtl = () =>
  Math.floor(Date.now() / 1000) + (4 * 60 * 60); // ttl for 4 hour
