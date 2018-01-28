import { STANDARD_SUITS } from './constants';
import getMessage from '../i18n/messages';

export function bidToString(level, suit) {
  if (STANDARD_SUITS.includes(suit)) {
    return `${level} ${getMessage(suit)}`;
  }
  return getMessage(suit);
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

export function shouldStandardBidButtonDisabled(currentLevel, currentSuit, buttonLevel, buttonSuit) {
  if (currentLevel !== buttonLevel) {
    return (currentLevel > buttonLevel);
  }
  return (STANDARD_SUITS.indexOf(currentSuit) >= STANDARD_SUITS.indexOf(buttonSuit));
}
