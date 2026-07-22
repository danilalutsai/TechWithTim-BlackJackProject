import { deck, takeRandomCard, type Card } from "./deck"
import prompt = require("prompt-async");

interface BetAnswer {
  bet: number;
}

interface ActionAnswer {
  action: string;
}

function calculateHandValue(hand: Card[]): number {
  return hand.reduce((acc, card) => acc + card.value!, 0)
}

function formatHand(hand: Card[]): string {
  return hand
    .map((card) => `${card.rank}${card.symbol}`)
    .join(" ");
}

function printPlayerHand(hand: Card[]): void {
  console.log(`Player's hand is ${formatHand(hand)}`);
  console.log(`Total value of your cards is: ${calculateHandValue(hand)}`);
  console.log("");
}

function printHiddenDealerHand(hand: Card[]): void {
  const formattedCards = hand.map((card, index) => {
    return index === 0
      ? `${card.rank}${card.symbol}`
      : '[HIDDEN]';
  })
  .join(" ");

  console.log(`Dealer's hand is ${formattedCards}`);
  console.log("");
}

function printDealerHand(hand: Card[]): void {
  console.log(`Dealer's hand is ${formatHand(hand)}`);
  console.log(`Total value of dealer's hand ${calculateHandValue(hand)}`);
  console.log("");
}

let balance = 100;

async function main(): Promise<void> {
  prompt.message = "";
  prompt.start();

  console.log("");
  console.log("You started the BlackJack game");
  console.log("We do not support gambling");
  console.log("");

  while (true) {
    console.log(`Player's funds ${balance}`);
    console.log("");

    const result = await prompt.get<BetAnswer>({
      properties: {
        bet: {
          description: "Enter your bet",
          required: true,
        }
      }
    })

    const bet = Number(result.bet);

    if (Number.isNaN(bet) || bet === 0) {
      console.log("Please enter a valid positive number to bet");
      continue;
    }

    if (bet > balance) {
      console.log("Bet exceeds your current balance. Try a lower bet");
      continue;
    }

    if (balance === 0) {
      console.log("Your balance is 0. You can not play");
      break;
    }

    console.log(`Player's bet is ${bet}`);
    console.log("");

    const playerHand: Card[] = takeRandomCard(deck, 2);
    const dealerHand: Card[] = takeRandomCard(deck, 2);

    printPlayerHand(playerHand);
    printHiddenDealerHand(dealerHand);

    while (true) {
      const { action } = await prompt.get<ActionAnswer>({
        properties: {
          action: {
            description: "Enter hit, stand or quit",
            required: true,
          },
        },
      });

      const normalizedAction = action.trim().toLowerCase();

      if (normalizedAction === "hit") {
        console.log("Player has taken another card");
        console.log("");

        const [addedCard] = takeRandomCard(deck, 1);

        if (!addedCard) {
          console.log("There is no cards left in the deck");
          return;
        }

        playerHand.push(addedCard);
        printPlayerHand(playerHand);

        const playerTotalValue = calculateHandValue(playerHand);

        if (playerTotalValue > 21) {
          console.log("Player has exceeded 21. Dealer has won");
          balance -= bet;
          console.log(`Your current balance is ${balance}`);
          console.log("");
          break;
        }

        continue;
      }

      if (normalizedAction === "stand") {
        console.log("");
        console.log("You stand and wait for the dealer's turn");
        console.log("");
        printDealerHand(dealerHand);

        while (calculateHandValue(dealerHand) < 17) {
          console.log("Dealer hits another card");

          const [addedCard] = takeRandomCard(deck, 1);

          if (!addedCard) {
            console.log("There is no cards left in the deck");
            return;
          }

          dealerHand.push(addedCard);
          printDealerHand(dealerHand);
        }

        const playerTotalValue = calculateHandValue(playerHand);
        const dealerTotalValue = calculateHandValue(dealerHand);

        if (dealerTotalValue > 21) {
          console.log("You have won. Dealer exceeded 21");
          balance += bet;
          console.log(`Your current balance is ${balance}`);

        } else if (dealerTotalValue > playerTotalValue) {
          console.log("Dealer has won. Is closer to 21");
          balance -= bet;
          console.log(`Your current balance is ${balance}`);

        } else if (dealerTotalValue < playerTotalValue) {
          console.log("You have won. You are closer to 21");
          balance += bet;
          console.log(`Your current balance is ${balance}`);

        } else {
          console.log("It is a draw");
          console.log(`Your current balance is ${balance}`);
        }

        console.log("");
        break;
      }

      if (normalizedAction === "quit") {
        console.log("");
        console.log("You quitted the game")
        return;
      }

      console.log("Unknown action. Enter hit, stand or quit.");
      
    }
  }
}

main();


// const playersFunds: number = 100;
// const currency: string = "$";
//
// function pickOneCard(): Card[] {
//   const pickedCard: Card[] = deck.splice(random, 1);
//   return pickedCard
// }
//
// const randomCards = takeRandomCard(deck, 2);
//
// async function main(): Promise<void> {
//   prompt.message = "";
//   prompt.start();
//
//   let balance: number = 100;
//   console.log("");
//   console.log("You started the BlackJack game")
//   console.log("We do not support gambling");
//   console.log("");
//
//
//   while (true) {
//     deck;
//     console.log(`Player's funds $${balance}`);
//     console.log("");
//
//     const { bet } = await prompt.get<PlayerAnswers>({
//       properties: {
//         bet: {
//           description: "Enter your bet",
//           required: false,
//         },
//       },
//     });
//     console.log(`Player's bet is $${bet}`);
//     console.log("");
//
//     // Record of players cards
//     let playerHand: Record<string, Card> = {};
//
//     // Take the first two cards
//     const playerStartingCards: Card[] = takeRandomCard(deck, 2);
//
//     for (const card of playerStartingCards) {
//       const cardNumber = Object.keys(playerHand).length + 1;
//       playerHand[`card${cardNumber}`] = card;
//     }
//
//     let playerTotalValue = Object.values(playerHand)
//     .reduce((acc, card) => acc + card.value!, 0);
//
//     const formattedCards = Object.values(playerHand)
//     .map((card) => {
//       return `${card.rank}${card.symbol}`;
//     })
//     .join(" ");
//
//     function printPlayersHand(): void {
//
//       console.log(`Player's hand is ${formattedCards}`);
//       console.log(`Total value of your cards is ${playerTotalValue}`);
//       console.log("");
//     }
//
//     printPlayersHand();
//
//     const dealerHand: Record<string, Card> = {};
//     const dealerStartingCards: Card[] = takeRandomCard(deck, 2);
//     const dealerTotalValue = Object.values(dealerHand)
//     .reduce((acc, card) => acc + card.value!, 0);
//
//     for (const card of dealerStartingCards) {
//       const cardNumber = Object.keys(dealerHand).length + 1;
//       dealerHand[`card${cardNumber}`] = card;
//     }
//
//     function printDealerHand(): void {
//       const formattedCards = Object.values(dealerHand)
//       .map((card, index) => {
//         if (index === 0) {
//           return `${card.rank}${card.symbol}`
//         } else {
//           return `[hidden]`
//         }
//       })
//       .join(" ");
//
//       console.log(`Dealer's hand is ${formattedCards}`);
//       console.log("");
//     }
//
//     printDealerHand();
//
//     while (true) {
//
//       const { action } = await prompt.get<PlayerAnswers>({
//         properties: {
//           action: {
//             description: "Your action (hit/stand/quit)",
//             required: true,
//           },
//         }
//       });
//
//       if (action.trim().toLowerCase() === "hit") {
//
//         console.log("Player have taken another card")
//
//         const [addedCard]: Card[] = takeRandomCard(deck, 1);
//
//         if (addedCard) {
//           const cardNumber = Object.keys(playerHand).length + 1;
//           playerHand[`card${cardNumber}`] = addedCard;
//
//           playerTotalValue = Object.values(playerHand)
//             .reduce((acc, card) => acc + card.value!, 0);
//
//           function printPlayersHand(): void {
//             const formattedCards = Object.values(playerHand)
//             .map((card) => {
//               return `${card.rank}${card.symbol}`;
//             })
//             .join(" ");
//             console.log("");
//             console.log(`Player's hand is ${formattedCards}`);
//             console.log(`Total value of your cards is ${playerTotalValue}`);
//             console.log("");
//           }
//
//           if (playerTotalValue > 21) {
//             console.log(`Player's hand is ${formattedCards}`);
//             console.log(`Total value of your cards is ${playerTotalValue}`);
//             console.log(`Player has exceeded 21. Dealer has won.`);
//             break;
//           }
//
//           printPlayersHand();
//         }
//       }
//
//       if (action.trim().toLowerCase() === "stand") {
//         const formattedCards = Object.values(dealerHand)
//         .map((card, index) => {
//           return `${card.rank}${card.symbol}`
//         })
//         .join(" ");
//
//         let dealerTotalValue = Object.values(dealerHand)
//         .reduce((acc, card) => acc + card.value!, 0);
//
//         function printDealerHand(): void {
//
//           console.log("");
//           console.log(`You stand and wait for the dealer's turn`);
//           console.log("");
//           console.log(`The dealer's hand is ${formattedCards}`);
//           console.log(`Total value of dealer's cards is ${dealerTotalValue}`);
//
//           while (dealerTotalValue < 17) {
//             console.log(`Dealer hits another card`);
//
//             const [addedCard]: Card[] = takeRandomCard(deck, 1);
//
//             if (addedCard) {
//               const cardNumber = Object.keys(dealerHand).length + 1;
//               dealerHand[`card${cardNumber}`] = addedCard;
//
//               function printPlayersHand(): void {
//                 const formattedCards = Object.values(dealerHand)
//                 .map((card) => {
//                   return `${card.rank}${card.symbol}`;
//                 })
//                 .join(" ");
//
//                 let dealerTotalValue = Object.values(dealerHand)
//                 .reduce((acc, card) => acc + card.value!, 0);
//
//                 console.log("");
//                 console.log(`Player's hand is ${formattedCards}`);
//                 console.log(`Total value of your cards is ${dealerTotalValue}`);
//                 console.log("");
//               }
//               printPlayersHand();
//             }
//           }
//           if (dealerTotalValue >= 17) {
//             console.log("");
//             console.log(`Dealer's total value is ${dealerTotalValue}.`);
//           } 
//           if (dealerTotalValue > 21) {
//             console.log(`Dealer has lost the game`);
//           } 
//           if (dealerTotalValue > playerTotalValue) {
//             console.log(`Dealer has won`);
//
//           }
//         }
//
//         printDealerHand();
//       }
//     }
//   }
// }
//
//
// main();
