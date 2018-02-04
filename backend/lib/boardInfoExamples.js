// The questions are from 'The Bidding Box' of 'ACBL Bridge Bulletin, Jan 2018'. The question numbers are 1, 6, 7

const boardInfo1 = {
  vulnerability: 'NONE',
  dealer: 'NORTH',
  eastHand: {
    SPADES: 'QJ',
    HEARTS: 'AK532',
    DIAMONDS: 'A642',
    CLUBS: 'AT',
  },
  westHand: {
    SPADES: 'A9764',
    HEARTS: '',
    DIAMONDS: 'KQ973',
    CLUBS: '942',
  },
  scoreList: [{
    bid: { level: 6, suit: 'DIAMONDS' },
    declarer: 'EW',
    score: 11,
  }, {
    bid: { level: 4, suit: 'SPADES' },
    declarer: 'EW',
    score: 8,
  }, {
    bid: { level: 5, suit: 'SPADES' },
    declarer: 'EW',
    score: 6,
  }, {
    bid: { level: 3, suit: 'NOTRUMPS' },
    declarer: 'EW',
    score: 4,
  }, {
    bid: { level: 5, suit: 'DIAMONDS' },
    declarer: 'EW',
    score: 4,
  }, {
    bid: { level: 6, suit: 'SPADES' },
    declarer: 'EW',
    score: 3,
  }, {
    bid: { level: 4, suit: 'NOTRUMPS' },
    declarer: 'EW',
    score: 2,
  }],
  nsActions: {
    0: { level: 1, suit: 'HEARTS' },
  },
};

const boardInfo6 = {
  vulnerability: 'EW',
  dealer: 'EAST',
  eastHand: {
    SPADES: 'A972',
    HEARTS: '5',
    DIAMONDS: 'AKJ64',
    CLUBS: 'KQ5',
  },
  westHand: {
    SPADES: 'J4',
    HEARTS: '742',
    DIAMONDS: 'Q98',
    CLUBS: 'AJ983',
  },
  scoreList: [{
    bid: { level: 5, suit: 'CLUBS' },
    declarer: 'EW',
    score: 10,
  }, {
    bid: { level: 5, suit: 'DIAMONDS' },
    declarer: 'EW',
    score: 10,
  }, {
    bid: { level: 4, suit: 'CLUBS' },
    declarer: 'EW',
    score: 4,
  }, {
    bid: { level: 4, suit: 'DIAMONDS' },
    declarer: 'EW',
    score: 4,
  }, {
    bid: { level: 2, suit: 'NOTRUMPS' },
    declarer: 'EW',
    score: 1,
  }, {
    bid: { level: 6, suit: 'CLUBS' },
    declarer: 'EW',
    score: 1,
  }],
  nsActions: {
    0: { level: 1, suit: 'HEARTS' },
    1: { level: 2, suit: 'HEARTS' },
  },
};

const boardInfo7 = {
  vulnerability: 'BOTH',
  dealer: 'SOUTH',
  eastHand: {
    SPADES: 'QJ8',
    HEARTS: 'Q873',
    DIAMONDS: 'AKQ',
    CLUBS: 'KQ7',
  },
  westHand: {
    SPADES: '74',
    HEARTS: 'AK96',
    DIAMONDS: 'JT963',
    CLUBS: 'AJ',
  },
  scoreList: [{
    bid: { level: 5, suit: 'NOTRUMPS' },
    declarer: 'EW',
    score: 11,
  }, {
    bid: { level: 4, suit: 'HEARTS' },
    declarer: 'EW',
    score: 7,
  }, {
    bid: { level: 5, suit: 'HEARTS' },
    declarer: 'EW',
    score: 6,
  }, {
    bid: { level: 5, suit: 'DIAMONDS' },
    declarer: 'EW',
    score: 3,
  }],
};


module.exports = {
  boardInfo1,
  boardInfo6,
  boardInfo7,
};
