import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'INPUT.md');
const input = fs.readFileSync(filePath, 'utf-8').trim();

// Split the input into lines, then split each line into an array of characters
const grid = input.split('\n').map((line) => line.trim().split(''));

const numRows = grid.length;
const numCols = grid[0].length;

// Helper to check if a cell is in bounds
function inBounds(x: number, y: number): boolean {
    return x >= 0 && x < numRows && y >= 0 && y < numCols;
}

// -------------------- PART 1 --------------------

// All 8 possible directions: right, down, left, up, and the 4 diagonals
const directions = [
    [0, 1],   // right
    [1, 0],   // down
    [0, -1],  // left
    [-1, 0],  // up
    [1, 1],   // down-right
    [1, -1],  // down-left
    [-1, 1],  // up-right
    [-1, -1], // up-left
];

// Count all occurrences of "XMAS" in any direction
function countXMASWord(): number {
    const word = 'XMAS';
    const wordLen = word.length;
    let count = 0;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            for (const [dx, dy] of directions) {
                let found = true;
                for (let k = 0; k < wordLen; k++) {
                    const ni = i + dx * k;
                    const nj = j + dy * k;
                    if (!inBounds(ni, nj) || grid[ni][nj] !== word[k]) {
                        found = false;
                        break;
                    }
                }
                if (found) count++;
            }
        }
    }
    return count;
}

// -------------------- PART 2 --------------------

// Check if the center at (i, j) forms an X-MAS (two MAS/SAM on diagonals)
function isXMASShape(i: number, j: number): boolean {
    // Diagonal 1: (i-1, j-1), (i, j), (i+1, j+1)
    // Diagonal 2: (i-1, j+1), (i, j), (i+1, j-1)
    const diag1 = [
        [i-1, j-1],
        [i, j],
        [i+1, j+1]
    ];
    const diag2 = [
        [i-1, j+1],
        [i, j],
        [i+1, j-1]
    ];

    // Check bounds for all involved cells
    for (const [x, y] of [...diag1, ...diag2]) {
        if (!inBounds(x, y)) return false;
    }

    // Get the letters for both diagonals
    const diag1Letters = diag1.map(([x, y]) => grid[x][y]);
    const diag2Letters = diag2.map(([x, y]) => grid[x][y]);

    // Each diagonal must be "MAS" or "SAM"
    const valid = (arr: string[]) =>
        (arr[0] === 'M' && arr[1] === 'A' && arr[2] === 'S') ||
        (arr[0] === 'S' && arr[1] === 'A' && arr[2] === 'M');

    return valid(diag1Letters) && valid(diag2Letters);
}

// Count all X-MAS shapes in the grid
function countXMASShape(): number {
    let count = 0;
    // Only check cells that can be the center of an X (not on the border)
    for (let i = 1; i < numRows - 1; i++) {
        for (let j = 1; j < numCols - 1; j++) {
            if (isXMASShape(i, j)) count++;
        }
    }
    return count;
}

// -------------------- OUTPUT --------------------

console.log('Solution for 04/2024...');
console.log('Part 1:', countXMASWord());
console.log('Part 2:', countXMASShape());