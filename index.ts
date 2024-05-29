#! /usr/bin/env node
import inquirer from 'inquirer';

console.log("Welcome to the adventure game!");

interface GameState {
  location: string;
  inventory: string[];
}

const gameState: GameState = {
  location: "forest",
  inventory: [],
};

async function promptUser() {
  const { command, arg } = await inquirer.prompt([
    {
      type: "input",
      name: "command",
      message: "Enter a command (go, take, inventory): ",
    },
    {
      type: "input",
      name: "arg",
      message: "Enter an argument (if applicable): ",
    },
  ]);

  processInput(command, arg);
}

function processInput(command: string, arg: string) {
  const words = command.trim().toLowerCase().split(" ");
  const cmd = words[0];
  const args = words.slice(1).join(" ");

  switch (cmd) {
    case "go":
      handleGo(args);
      break;
    case "take":
      handleTake(args);
      break;
    case "inventory":
      handleInventory();
      break;
    default:
      console.log("Invalid command");
  }

  promptUser();
}

function handleGo(location: string) {
  if (location === "cave") {
    gameState.location = "cave";
    console.log("You enter the dark cave.");
  } else {
    console.log("You cannot go there.");
  }
}

function handleTake(item: string) {
  const trimmedItem = item.trim();
  if (trimmedItem === "sword" && gameState.location === "forest") {
    gameState.inventory.push("sword");
    console.log("You take the sword.");
  } else {
    console.log("You cannot take that.");
  }
  
}

function handleInventory() {
  console.log(`Inventory: ${gameState.inventory.join(", ")}`);
}

promptUser();
