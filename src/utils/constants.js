export const POSSIBLE_LEVELS = [1, 2, 3, 4, 5, 6, 7];

export const STANDARD_SUITS = ['CLUBS', 'DIAMONDS', 'HEARTS', 'SPADES', 'NOTRUMPS'];
export const SPECIAL_SUITS = ['PASS', 'DOUBLE', 'REDOUBLE'];
export const ALL_SUITS = ['CLUBS', 'DIAMONDS', 'HEARTS', 'SPADES', 'NOTRUMPS', 'PASS', 'DOUBLE', 'REDOUBLE'];

export const NS_SEATS = ['NORTH', 'SOUTH'];
export const EW_SEATS = ['WEST', 'EAST'];
export const SEATS = ['WEST', 'NORTH', 'EAST', 'SOUTH'];
export const DECLARERS = ['WEST', 'NORTH', 'EAST', 'SOUTH', 'NS', 'EW'];
export const PARTICIPANTS = ['WEST', 'EAST', 'WATCHER'];

export const VULNERABILITIES = ['NONE', 'NS', 'EW', 'BOTH'];

export const BOOLEANS = [true, false];

export const SERVER_API_HOST = `${process.env.REACT_APP_BACKEND_SCHEMA}://${process.env.REACT_APP_BACKEND_URL}`;
export const SERVER_WS_HOST = `ws://${process.env.REACT_APP_BACKEND_URL}`;
