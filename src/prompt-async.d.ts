// This tell TypeScript there is a package named "prompt-async", even thought it does not 
// include its own TypeScript types
// Without this file, TypeScript would complain that it doesn't understand the types of the package
// This file does not run in Node.js It only helps TypeScript understand the JavaScript package

// This say the package called "prompt-async" exists
declare module "prompt-async" {

  // This describes one terminal question
  type PromptQuestion = {
    // Is the question showed to the user field
    description: string;
    // Required is a boolean optional field
    required?: boolean;
  };

  // This describes an object with a properties field
  type PromptSchema = {
    properties: Record<string, PromptQuestion>;
  };

  // This describes the package API
  interface Prompt {
    message: string;
    // Starts the prompt system. Void means it returns no usefull value
    start(): void;
    // Accepts an array of question names, returns a Promise because user input takes time,
    // T is a generic type, you tell the TypeScript what shape of answers you expect
    get<T>(properties: string[] | PromptSchema): Promise<T>;
  }

  // This says the imported prompt value follows the prompt interface
  const prompt: Prompt;

  // This matches the package's CommonJS style, where JavaScript imports it with require("prompt-async")
  export = prompt;
}
