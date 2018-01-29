import { STANDARD_SUITS } from './constants';

export function isPass(bid) {
  return (bid && bid.suit === 'PASS');
}

export function isDouble(bid) {
  return (bid && bid.suit === 'DOUBLE');
}

export function isSuit(bid) {
  return (bid && STANDARD_SUITS.includes(bid.suit));
}

export function isBidSeqEnded(bidSeq) {
  const bidSeqLen = bidSeq.length;
  if (isPass(bidSeq[bidSeqLen - 3]) &&
      isPass(bidSeq[bidSeqLen - 2]) &&
      isPass(bidSeq[bidSeqLen - 1])) {
    return (bidSeqLen >= 4);
  }
  return false;
}

export function isDoubleAllowed(bidSeq) {
  const bidSeqLen = bidSeq.length;
  if (isSuit(bidSeq[bidSeqLen - 1])) {
    return false;
  }
  if (isSuit(bidSeq[bidSeqLen - 3]) &&
      isPass(bidSeq[bidSeqLen - 2]) &&
      isPass(bidSeq[bidSeqLen - 1])) {
    return false;
  }
  return true;
}

export function isRedoubleAllowed(bidSeq) {
  const bidSeqLen = bidSeq.length;
  if (isDouble(bidSeq[bidSeqLen - 1])) {
    return false;
  }
  if (isDouble(bidSeq[bidSeqLen - 3]) &&
      isPass(bidSeq[bidSeqLen - 2]) &&
      isPass(bidSeq[bidSeqLen - 1])) {
    return false;
  }
  return true;
}

export function getCurrentBid(bidSeq) {
  for (let i = bidSeq.length - 1; i >= 0; i -= 1) {
    if (isSuit(bidSeq[i])) {
      return bidSeq[i];
    }
  }
  return { level: 0, suit: 'PASS' };
}

export function isStandardBidAllowed(currentLevel, currentSuit, level, suit) {
  if (currentLevel !== level) {
    return (currentLevel > level);
  }
  return (STANDARD_SUITS.indexOf(currentSuit) >= STANDARD_SUITS.indexOf(suit));
}
