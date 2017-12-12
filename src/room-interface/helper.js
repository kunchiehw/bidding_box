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

export function suitBidToString(bid) {
  switch (bid.suit) {
    case 'NOTRUMPS':
      return `${bid.level}N`;
    case 'SPADES':
      return `${bid.level}\u2660`;
    case 'HEARTS':
      return `${bid.level}\u2665`;
    case 'DIAMONDS':
      return `${bid.level}\u2666`;
    case 'CLUBS':
      return `${bid.level}\u2663`;
    default:
      return '';
  }
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
    case 'REDOUBLE':
      return 'blue';
    case 'SPADES':
      return 'black';
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
      return 'Pa';
    case 'DOUBLE':
      return 'X';
    case 'REDOUBLE':
      return 'XX';
    default:
      return '';
  }
}
