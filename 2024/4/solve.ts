import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'INPUT.md');
const input = fs.readFileSync(filePath, 'utf-8').trim();

// Split the input into lines, then split each line into an array of characters
const grid = input.split('\n').map((line) => line.trim().split(''));

// The word we are searching for
const word = 'XMAS';
const wordLen = word.length;

// Get the number of rows and columns in the grid
const numRows = grid.length;
const numCols = grid[0].length;

// Define all 8 possible directions to search for the word
// Each direction is represented as [dx, dy] (row change, column change)
const directions = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
  [1, 1], // down-right
  [1, -1], // down-left
  [-1, 1], // up-right
  [-1, -1], // up-left
];

// Helper function to check if a position is within the grid bounds
function inBounds(x: number, y: number): boolean {
  return x >= 0 && x < numRows && y >= 0 && y < numCols;
}

// Main function to count all occurrences of the word in the grid
function countWord(): number {
  let count = 0;
  // Loop over every cell in the grid
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      // For each direction, check if the word appears starting at (i, j)
      for (const [dx, dy] of directions) {
        let found = true;
        // Check each character in the word
        for (let k = 0; k < wordLen; k++) {
          const ni = i + dx * k; // Next row index
          const nj = j + dy * k; // Next column index
          // If out of bounds or character doesn't match, break
          if (!inBounds(ni, nj) || grid[ni][nj] !== word[k]) {
            found = false;
            break;
          }
        }
        // If all characters matched in this direction, increment count
        if (found) count++;
      }
    }
  }
  return count;
}

// Print the result to the console
console.log('Solution for 04/2024...');
console.log(countWord());
// console.log(input)
