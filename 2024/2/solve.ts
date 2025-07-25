import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Read input (one sequence per line, space-separated numbers)
// const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'INPUT.md');
const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const lines = input.map(line => line.split(/\s+/).map(Number));

// Helper: Check if array is strictly increasing or decreasing, and all diffs in [1,3]
function isSafe(seq: number[]): boolean {
  if (seq.length < 2) return true;
  const diffs = seq.slice(1).map((n, i) => n - seq[i]);
  const allIncreasing = diffs.every(d => d >= 1 && d <= 3);
  const allDecreasing = diffs.every(d => d <= -1 && d >= -3);
  return allIncreasing || allDecreasing;
}

// Part 1: Count safe lines
const part1 = lines.filter(isSafe).length;

// Part 2: Count lines that are safe, or can be made safe by removing one number
function isSafeWithOneRemoval(seq: number[]): boolean {
  if (isSafe(seq)) return true;
  for (let i = 0; i < seq.length; i++) {
    const newSeq = seq.slice(0, i).concat(seq.slice(i + 1));
    if (isSafe(newSeq)) return true;
  }
  return false;
}
const part2 = lines.filter(isSafeWithOneRemoval).length;

console.log('Solution for 02/2024...');
console.log('Safe lines - Part 1:', part1); // 463
console.log('Safe lines - Part 2:', part2); // 514