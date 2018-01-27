const US_MESSAGE = {
  CLUBS: '\u2663',
  DIAMONDS: '\u2666',
  HEARTS: '\u2665',
  SPADES: '\u2660',
  NOTRUMPS: 'N',
  PASS: 'PASS',
  DOUBLE: 'X',
  REDOUBLE: 'XX',
};

export function getMessage(indicator) {
  return US_MESSAGE[indicator];
}

export function foo() {}
