import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// https://adventofcode.com/2024/day/2

function individualLines(filename: string): string[] {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.resolve(__dirname, filename);
  return fs.readFileSync(filePath, 'utf-8').split('\n');
}

function ensureDiffIsSafe (numA: number, numB: number): boolean {
  const safeDiff = Math.abs(numA - numB)

  return safeDiff >= 1 && safeDiff <= 3;
}

function checkForSafeLine(lines: string[]): number {
  let safeLines = 0;

  for (const line of lines) {
    const lineAsNumberArray = line.split(' ').map(string => parseInt(string));
    
    if (Number.isNaN(lineAsNumberArray[0])) {
      break;
    }

    // - The levels are either _all increasing_ or _all decreasing_.
    // - Any two adjacent levels differ by _at least one_ and _at most three_.

    let firstNumbersAreAscending: boolean | undefined = undefined;
    for (const [index, lineItem] of lineAsNumberArray.entries()) {
      
      // Check first diff
      // Check and set if numbers are ascending
      if (index === 1) {
        const firstItem = lineAsNumberArray[0];
        const secondItem = lineAsNumberArray[1];

        if ( !ensureDiffIsSafe(firstItem, secondItem) ) break;

        firstNumbersAreAscending = firstItem < secondItem 
      }


      if ( index > 1) {
        const numA = lineAsNumberArray[index - 1]
        const numB = lineItem
        const currentNumbersAscending = numA < numB

        // Check numbers are still ascending (or descending)
        if (firstNumbersAreAscending !== currentNumbersAscending) break;

        // Check number are a safe distance
        if (!ensureDiffIsSafe(numA, numB) ) break;

        // If last number and still all fine, add to safe lines
        if (lineAsNumberArray.length - 1 === index) {
          safeLines += 1;
        }
      }
    }


  }
  return safeLines

}

// Main
const lines = individualLines('INPUT.md');
console.log('Solution for 02/2024...');
console.log('Safe Lines:', checkForSafeLine(lines));
