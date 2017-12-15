const suitToNumber = (suit) => {
  switch (suit) {
    case 'NOTRUMPS':
      return 5;
    case 'SPADES':
      return 4;
    case 'HEARTS':
      return 3;
    case 'DIAMONDS':
      return 2;
    case 'CLUBS':
      return 1;
    default:
      return 0;
  }
};

export function suitChar(suit) {
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

export function suitBidToString(bid) {
  return `${bid.level} ${suitChar(bid.suit)}`;
}

export function suitBidButtonDisabled(curBid, bid) {
  if (curBid === null || curBid.level < bid.level) {
    return false;
  }
  if (curBid.level > bid.level) {
    return true;
  }
  return (suitToNumber(curBid.suit) >= suitToNumber(bid.suit));
}

export function bidColor(suit) {
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

export function otherBidToString(suit) {
  switch (suit) {
    case 'PASS':
      return 'Pass';
    case 'DOUBLE':
      return 'X';
    case 'REDOUBLE':
      return 'XX';
    default:
      return '';
  }
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
