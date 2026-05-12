const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function createDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank });
    }
  }
  return deck;
}

export function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getCardValue(card) {
  if (['J', 'Q', 'K'].includes(card.rank)) return 10;
  if (card.rank === 'A') return 11;
  return parseInt(card.rank);
}

export function calculateHandValue(hand) {
  let value = 0;
  let aces = 0;
  for (const card of hand) {
    value += getCardValue(card);
    if (card.rank === 'A') aces++;
  }
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }
  return value;
}

export function isBlackjack(hand) {
  return hand.length === 2 && calculateHandValue(hand) === 21;
}

export function isBusted(hand) {
  return calculateHandValue(hand) > 21;
}

export function isRedSuit(suit) {
  return suit === '♥' || suit === '♦';
}

export const GAME_STATES = {
  BETTING: 'betting',
  PLAYING: 'playing',
  DEALER_TURN: 'dealer_turn',
  FINISHED: 'finished',
};