export function suitToNumber(suit) {
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
    /* istanbul ignore next */
    default:
      return 0;
  }
}

export function shouldStandardBidButtonDisabled(currentLevel, currentSuit, level, suit) {
  if (currentSuit === null || currentLevel < level) {
    return false;
  }
  if (currentLevel > level) {
    return true;
  }
  return (suitToNumber(currentSuit) >= suitToNumber(suit));
}
