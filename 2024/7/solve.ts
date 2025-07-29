import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'INPUT.md');
const input = fs.readFileSync(filePath, 'utf-8').trim();

const individualLines = input.split('\n');
const valuesToAdd: number[] = []

const checkCombinations = (digits: number[], value: number) => {
  const n = digits.length;
  if (n < 2) return;

  // There are (n-1) operator slots, each can be '+' or '*'
  const totalCombinations = 1 << (n - 1); // 2^(n-1)

  for (let mask = 0; mask < totalCombinations; mask++) {
    // Handle for left to right evaluation 
    let result = digits[0];
    for (let i = 0; i < n - 1; i++) {
      const op = (mask & (1 << i)) ? '*' : '+';
      if (op === '+') {
        result = result + digits[i + 1];
      } else {
        result = result * digits[i + 1];
      }
    }
    if (result === value) {
      valuesToAdd.push(value);
      break; // Only add once per value
    }
  }
}


const handleSolve = () => {
  for (const line of individualLines) {
    line.replace(" ", "");
    const lineSplit = line.split(":")

    const value = parseInt(lineSplit[0])
    const digitsAsString = lineSplit[1].trim();

    const digits = digitsAsString.split(" ").map(Number);

    checkCombinations(digits, value);
  }

  const total = valuesToAdd.reduce((sum, val) => sum + val, 0);
  console.log('Part 1: ', total);
}

console.log('Solution for 07/2024...');
handleSolve()
