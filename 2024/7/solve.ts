import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'INPUT_HINT.md');
const input = fs.readFileSync(filePath, 'utf-8').trim();

const individualLines = input.split('\n');
const valuesToAdd: number[] = []

const handleSolve = () => {
 
  for (const line of individualLines) {
    line.replace(" ", "");
    const lineSplit = line.split(":")

    const value = parseInt(lineSplit[0])
    const digitsAsString = lineSplit[1].trim();

    const digits = digitsAsString.split(" ").map(Number);
    console.log({value, digits})

    if (digits.length === 2) {
      if (digits[0] + digits[1] === value) {
        valuesToAdd.push(value);
        continue;
      }
      if (digits[0] * digits[1] === value) {
        valuesToAdd.push(value);
        continue;
      }
    } else if (digits.length === 3) {
      if (digits[0] + digits[1] + digits[2] === value) {
        valuesToAdd.push(value);
        continue;
      }
      if (digits[0] * digits[1] + digits[2] === value) {
        valuesToAdd.push(value);
        continue;
      }
      if (digits[0] + digits[1] * digits[2] === value) {
        valuesToAdd.push(value);
        continue;
      }
      if (digits[0] * digits[1] * digits[2] === value) {
        valuesToAdd.push(value);
        continue;
      }
    } else if (digits.length === 4) {
      if (digits[0] + digits[1] + digits[2] + digits[3] === value) {
        valuesToAdd.push(value);
        continue;
      }
      if (digits[0] * digits[1] + digits[2] + digits[3] === value) {
        valuesToAdd.push(value);
        continue;
      }
      if (digits[0] * digits[1] * digits[2] + digits[3] === value) {
        valuesToAdd.push(value);
        continue;
      }
      if (digits[0] * digits[1] * digits[2] * digits[3] === value) {
        valuesToAdd.push(value);
        continue;
      }
      if (digits[0] + digits[1] * digits[2] * digits[3] === value) {
        valuesToAdd.push(value);
        continue;
      }
      if (digits[0] * digits[1] + digits[2] * digits[3] === value) {
        valuesToAdd.push(value);
        continue;
      }
      if (digits[0] + digits[1] * digits[2] + digits[3] === value) {
        valuesToAdd.push(value);
        continue;
      }
      if (digits[0] * digits[1] * digits[2] * digits[3] === value) {
        valuesToAdd.push(value);
        continue;
      }
      
    }
    // [ 81, 40, 27 ]
    // Combinations
    // [ 81 + 40 + 27 ]
    // [ 81 * 40 + 27 ]
    // [ 81 + 40 * 27 ]
    // [ 81 * 40 * 27 ]

      console.log({valuesToAdd})
  }
//  let total = 0;
//   valuesToAdd.reduce(total, currentValue)
}
console.log('Solution for 07/2024...');
handleSolve()
