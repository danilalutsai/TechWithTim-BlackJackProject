// This imports the real installed package from node_modules
import prompt = require("prompt-async");

// This describes the answers you expect to receive
type PlayerAnswers = {
  playerName: string;
  favoriteCard: string;
};

// main() is async because it need to wait for the user input
async function main(): Promise<void> {
  // Start prompt-async once before asking questions
  prompt.start();

  // Ask the user questions and wait for every answer
  // Await pauses the function until the user finishes typing
  // <PlayerAnswers> tells TypeScript that answers will contain the two properties defined in PlayerAnswers
  const answers = await prompt.get<PlayerAnswers>({
    properties: {
      playerName: {
        description: "What is your username?",
        required: true,
      },
      favoriteCard: {
        description: "What is your favorite card?",
        required: true,
      },
    },
  });

  // Use the answers stored in the answers object.
  console.log(`Hello, ${answers.playerName}!`);
  console.log(`Your favorite card is ${answers.favoriteCard}.`);

  switch (answers.playerName) {
    case "Messi":
      console.log(`Your name is Messi?`);
      break
    case "Ronaldo":
      console.log(`Your name is Ronaldo?`);
      break
  }
}

void main().catch((error: unknown) => {
  console.error("The prompt failed:", error);
});
