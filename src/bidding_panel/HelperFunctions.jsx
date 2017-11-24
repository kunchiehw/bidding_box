const suitToNumber = (suit) => {
  switch(suit) {
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
}

export function suitBidToString(bid) {
  switch (bid.suit) {
    case 'NOTRUMPS':
      return bid.level + 'N';
    case 'SPADES':
      return bid.level + 'S';
    case 'HEARTS':
      return bid.level + 'H';
    case 'DIAMONDS':
      return bid.level + 'D';
    case 'CLUBS':
      return bid.level + 'C';
    default:
      return '';
  }
}

export function suitBidCSS(bid) {
  switch (bid.suit) {
    case 'NOTRUMPS':
      return 'bidding-button no-trumps-button';
    case 'SPADES':
      return 'bidding-button spades-button';
    case 'HEARTS':
      return 'bidding-button hearts-button';
    case 'DIAMONDS':
      return 'bidding-button diamonds-button';
    case 'CLUBS':
      return 'bidding-button clubs-button';
    default:
      return '';
  }
}

export function suitBidDisabled(curBid, bid) {
  if (curBid === null || curBid.level < bid.level) {
    return false;
  }
  if (curBid.level > bid.level) {
    return true;
  }
  return (suitToNumber(curBid.suit) >= suitToNumber(bid.suit));
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

export function otherBidCSS(suit) {
  switch (suit) {
    case 'PASS':
      return 'bidding-button pass-button';
    case 'DOUBLE':
      return 'bidding-button double-button';
    case 'REDOUBLE':
      return 'bidding-button redouble-button';
    default:
      return '';
  }
}
