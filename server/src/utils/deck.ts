import Hand, { Card } from "../models/Hand";

export const createDeck = (): Card[] => {
  const suits: Card['suit'][] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = Array.from({ length: 13}, (_, i) => i + 2);

  const deck: Card[] = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }

  return shuffleDeck(deck);
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];

  //fisher-yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  } 

  return shuffled;
}

export const dealCards =  (deck: Card[], numPlayers: number, cardsPerPlayer: number = 2):{playerCards: Card[][], remainingDeck: Card[]} => {
  const playerCards : Card[][] = Array.from({length: numPlayers}, () => []);
  const remainingDeck = [...deck];

  // dealing cards to each playerCards
  for (let i = 0; i < cardsPerPlayer; i++) {
    for (let j = 0; j < numPlayers; j++) {
      if (remainingDeck.length > 0) {
        const card = remainingDeck.pop()!;
        playerCards[j].push(card);
      }
    }
  } 

  return {playerCards, remainingDeck};
};

export const dealCommunityCards = (deck: Card[], count: number) : {communityCards: Card[], remainingDeck: Card[]} => {
  const remainingDeck = [...deck];
  const communityCards : Card[] = [];

  for (let i = 0 ; i < count; i++) {
    if (remainingDeck.length > 0) {
      communityCards.push(remainingDeck.pop()!);
    }
  }

  return {communityCards, remainingDeck};
}
