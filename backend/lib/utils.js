const jwt = require('jsonwebtoken');
const {
  isDoubleAllowed, isRedoubleAllowed, getCurrentBid, isStandardBidAllowed,
} = require('./constants');
const { SEATS, STANDARD_SUITS } = require('./bidHelpers');

const secret = process.env.SHARE_SECRET;
const db = {
  users: {
    wkc: 'password',
    jarron: 'password',
    unittest: 'password',
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


module.exports.authenticateUserMiddleware = (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  const { username, password } = req.body;

  authenticateUser(username, password)
    .then((token) => {
      res.send(token);
    })
    .catch(() => {
      res.status(401).send('Unauthenticated');
    });
};


module.exports.validateJwtMiddleware = (req, res, next) => {
  // Bearer token usage: https://tools.ietf.org/html/rfc6750
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];
    validateJwt(token)
      .then(() => next())
      .catch(() => next(new Error('Unauthorized')));
  } else {
    next(new Error('Unauthorized'));
  }
};


/* istanbul ignore next */
module.exports.getTtl = () => Math.floor(Date.now() / 1000) + (4 * 60 * 60); // ttl for 4 hour


module.exports.generateNSNextBid = (dealer, bidSeq, nsActions) => {
  const bidSeqLen = bidSeq.length;

  // if EW turn, return null
  if ((SEATS.indexOf(dealer) + bidSeqLen) % 2 === 0) {
    return null;
  }

  // if NS attempt to bid something, check if it's allowed.
  if (nsActions && nsActions[bidSeqLen / 2]) {
    const nsAttempBid = nsActions[bidSeqLen / 2];

    if (nsAttempBid.suit === 'DOUBLE' && isDoubleAllowed(bidSeq)) { // check 'DOUBLE'
      return nsAttempBid;
    }
    if (nsAttempBid.suit === 'REDOUBLE' && isRedoubleAllowed(bidSeq)) { // check 'REDOUBLE'
      return nsAttempBid;
    }

    if (STANDARD_SUITS.includes(nsAttempBid.suit)) { // check standard bid
      const currentBid = getCurrentBid(bidSeq);
      if (isStandardBidAllowed(currentBid.level, currentBid.suit, nsAttempBid.level, nsAttempBid.suit)) {
        return nsAttempBid;
      }
    }
  }

  // After all checks, return 'PASS'
  return { level: 0, suit: 'PASS' };
};
