/*
  This function is supposed to import the following functions in src/utils/bidHelpers.js:
  isDoubleAllowed, isRedoubleAllowed, getCurrentBid, isStandardBidAllowed

  This function is supposed to import the following constants in src/utils/constants.js:
  SEATS, STANDARD_SUITS
*/

export default function generateNSNextBid(dealer, bidSeq, nsActions) {
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
    } else if (nsAttempBid.suit === 'REDOUBLE' && isRedoubleAllowed(bidSeq)) { // check 'REDOUBLE'
      return nsAttempBid;
    } else if (STANDARD_SUITS.includes(nsAttempBid.suit)) { // check standard bid
      const currentBid = getCurrentBid(bidSeq);
      if (isStandardBidAllowed(currentBid.level, currentBid.suit, nsAttempBid.level, nsAttempBid.suit)) {
        return nsAttempBid;
      }
    }
  }

  // After all checks, return 'PASS'
  return { level: 0, suit: 'PASS' };
}
