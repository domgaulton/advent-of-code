// Your code is not working for a few reasons:

// 1. You are not tracking visited positions ￼
//  • The problem asks for the number of distinct positions visited, not the number of moves.
//  • You need a ‎`Set` to store each unique position the guard visits.

// 2. You are not marking the starting position as visited ￼
//  • The guard’s starting position should be included in the count.

// 3. Your movement logic is flawed ￼
//  • When the guard hits a wall, you try to “undo” the move, but you already moved into the wall. Instead, you should check ahead before moving.
//  • The guard should only move if the next cell is open (‎`.`), otherwise, turn right.

// 4. You are using recursion, which is not necessary and can cause stack overflow for large maps ￼
//  • Use a loop for clarity and safety.

// 5. You are not handling the guard’s facing direction symbol (‎`^`, ‎`v`, ‎`<`, ‎`>`) ￼
//  • You should parse the starting direction from the symbol.



// guard-path.ts

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'INPUT_HINT.md');
const input = fs.readFileSync(filePath, 'utf-8').trim();

type Direction = 'up' | 'down' | 'left' | 'right';

const DIRS: Record<Direction, [number, number]> = {
  up:    [-1, 0],
  right: [0, 1],
  down:  [1, 0],
  left:  [0, -1],
};

const NEXT_DIRECTION: Record<Direction, Direction> = {
  up: 'right',
  right: 'down',
  down: 'left',
  left: 'up',
};

const DIR_SYMBOLS: Record<string, Direction> = {
  '^': 'up',
  'v': 'down',
  '<': 'left',
  '>': 'right',
};

const room = input.split('\n').map(row => row.split(''));
const numRows = room.length;
const numCols = room[0].length;

// Find starting position and direction
let startRow = 0, startCol = 0, startDir: Direction = 'up';
outer: for (let r = 0; r < numRows; r++) {
  for (let c = 0; c < numCols; c++) {
    if ('^v<>'.includes(room[r][c])) {
      startRow = r;
      startCol = c;
      startDir = DIR_SYMBOLS[room[r][c]];
      break outer;
    }
  }
}

// Track visited positions
const visited = new Set<string>();
let row = startRow, col = startCol, dir = startDir;
visited.add(`${row},${col}`);

while (true) {
  // Calculate next position
  const [dr, dc] = DIRS[dir];
  const nextRow = row + dr;
  const nextCol = col + dc;

  // Check if out of bounds
  if (
    nextRow < 0 || nextRow >= numRows ||
    nextCol < 0 || nextCol >= numCols
  ) {
    break;
  }

  // Check if next cell is a wall
  if (room[nextRow][nextCol] === '#') {
    dir = NEXT_DIRECTION[dir];
    continue;
  }

  // Move forward
  row = nextRow;
  col = nextCol;
  visited.add(`${row},${col}`);
}

console.log('Distinct positions visited:', visited.size);
