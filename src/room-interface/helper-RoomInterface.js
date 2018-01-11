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
