import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'INPUT.md');
const input = fs.readFileSync(filePath, 'utf-8').trim();

// Part 1: Sum all mul(x,y)
function part1(input: string): number {
  const regex = /mul\((\d+),(\d+)\)/g;
  let sum = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);
    sum += x * y;
  }
  return sum;
}

// Part 2: Only sum mul(x,y) when enabled
function part2(input: string): number {
  const regex = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g;
  let sum = 0;
  let enabled = true;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    if (match[0] === 'do()') {
      enabled = true;
    } else if (match[0] === "don't()") {
      enabled = false;
    } else if (match[1] !== undefined && match[2] !== undefined && enabled) {
      const x = parseInt(match[1], 10);
      const y = parseInt(match[2], 10);
      sum += x * y;
    }
  }
  return sum;
}

console.log('Solution for 03/2024...');
console.log('Sum of pairs - Part 1:', part1(input));
console.log('Sum of pairs - Part 2:', part2(input));