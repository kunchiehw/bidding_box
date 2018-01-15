import { SEATS, STANDARD_SUITS } from '../util/util';

export function suitCharacter(suit) {
  switch (suit) {
    case 'NOTRUMPS':
      return 'N';
    case 'SPADES':
      return '\u2660';
    case 'HEARTS':
      return '\u2665';
    case 'DIAMONDS':
      return '\u2666';
    case 'CLUBS':
      return '\u2663';
    default:
      return '';
  }
}

export function bidToString(level, suit) {
  switch (suit) {
    case 'PASS':
      return 'Pass';
    case 'DOUBLE':
      return 'X';
    case 'REDOUBLE':
      return 'XX';
    default:
      return `${level} ${suitCharacter(suit)}`;
  }
}

export function suitColor(suit) {
  switch (suit) {
    case 'NOTRUMPS':
      return 'black';
    case 'SPADES':
    case 'REDOUBLE':
      return 'blue';
    case 'HEARTS':
    case 'DOUBLE':
      return 'red';
    case 'DIAMONDS':
      return 'orange';
    case 'CLUBS':
    case 'PASS':
      return 'green';
    default:
      return '';
  }
}

export function getPlayerRole(roomInfo, username) {
  if (roomInfo && roomInfo.westID === username) return 'WEST';
  if (roomInfo && roomInfo.eastID === username) return 'EAST';
  return 'OBSERVER';
}

export function getWhoseTurn(playerRole, dealer, bidSeq) {
  if (playerRole === 'WEST') {
    return ((SEATS.indexOf(dealer) + bidSeq.length) % 4 === SEATS.indexOf('WEST')) ? 'WEST' : 'EAST';
  }

  if (playerRole === 'EAST') {
    return ((SEATS.indexOf(dealer) + bidSeq.length) % 4 === SEATS.indexOf('EAST')) ? 'EAST' : 'WEST';
  }

  return null;
}

export function isPass(bid) {
  return (bid && bid.suit === 'PASS');
}

export function isDouble(bid) {
  return (bid && bid.suit === 'DOUBLE');
}

export function isSuit(bid) {
  return (bid && STANDARD_SUITS.indexOf(bid.suit) !== -1);
}

export function getBidSeqIsEnded(bidSeq) {
  const bidSeqLen = bidSeq.length;
  if (isPass(bidSeq[bidSeqLen - 3]) &&
      isPass(bidSeq[bidSeqLen - 2]) &&
      isPass(bidSeq[bidSeqLen - 1])) {
    return (bidSeqLen >= 4);
  }
  return false;
}

export function getCurrentBid(bidSeq) {
  for (let i = bidSeq.length - 1; i >= 0; i -= 1) {
    if (isSuit(bidSeq[i])) {
      return bidSeq[i];
    }
  }
  return { level: 0, suit: 'PASS' };
}

export function getShouldDisabledDouble(bidSeq) {
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

export function getShouldDisabledRedouble(bidSeq) {
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

export function declarerToString(declarer) {
  switch (declarer) {
    case 'WEST':
      return 'W';
    case 'NORTH':
      return 'N';
    case 'EAST':
      return 'E';
    case 'SOUTH':
      return 'S';
    case 'NS':
      return 'NS';
    case 'EW':
      return 'EW';
    default:
      return '';
  }
}
