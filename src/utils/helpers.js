import { STANDARD_SUITS, NS_SEATS, EW_SEATS, SEATS } from './constants';
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

export function isVulnerable(seat, vulnerability) {
  if (vulnerability === 'BOTH') return true;
  if (vulnerability === 'NS' && NS_SEATS.includes(seat)) return true;
  if (vulnerability === 'EW' && EW_SEATS.includes(seat)) return true;
  return false;
}

export function getPlayerRole(eastId, westId, username) {
  if (westId === username) return 'WEST';
  if (eastId === username) return 'EAST';
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
