// In this file we specify our deck of cards and its shuffeling

// We create an object with possible numbers the key is the name of the card 
// and the value is the points for that card

// Record is a built-in TypeScript utility for describing an object's key types and value types
export type Card = {
  rank?: string;
  value?: number;
  symbol?: string;
}

const cardValues: Record<string, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "J": 10,
  "Q": 10,
  "K": 10,
  "A": 11,
};

const suits: Record<string, string> = {
  "hearts": "❤",
  "diamonds": "♦",
  "clubs": "♣",
  "spades": "♠",
};

function createDeck(): Card[] {
  const fullDeck: Card[] = [];

  for (const [rank, value] of Object.entries(cardValues)) {
    for (const symbol of Object.values(suits)) {
      fullDeck.push({
        rank,
        symbol,
        value
      });
    }
  }

  return fullDeck;
}

export const deck = createDeck();
export const random = Math.floor(Math.random() * 52)
export const randomCard = deck[random];

export function takeRandomCard(deck: Card[], amount: number): Card[] {
  if (amount < 1) {
    throw new Error("Amount must be at least 1.");
  }

  if (amount > deck.length) {
    throw new Error("Not enough cards in the deck.");
  }

  const chosenCards: Card[] = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex: number = Math.floor(Math.random() * deck.length);
    const [card] = deck.splice(randomIndex, 1);

    if (card === undefined) {
      throw new Error("Error getting the card from the deck");
    }

    chosenCards.push(card);
  }

  return chosenCards
}


