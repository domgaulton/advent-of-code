import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// https://adventofcode.com/2024/day/1

function getAndSplitLines(filename: string): [number[], number[]] {
	const left: number[] = [];
	const right: number[] = [];
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const filePath = path.resolve(__dirname, filename);
	const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

	for (const line of lines) {
		if (line.trim() === '') continue;
		const [l, r] = line.trim().split(/\s+/).map(Number);
		left.push(l);
		right.push(r);
	}
	return [left, right];
}

function totalDistance(left: number[], right: number[]): number {
	const leftSorted = [...left].sort((a, b) => a - b);
	const rightSorted = [...right].sort((a, b) => a - b);
	return leftSorted.reduce((sum, l, i) => sum + Math.abs(l - rightSorted[i]), 0);
}

// Main
const [left, right] = getAndSplitLines('INPUT.md');
console.log('Solution for 01/2024...');
console.log('Total distance:', totalDistance(left, right));
