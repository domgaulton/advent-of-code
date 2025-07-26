import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'INPUT.md');
const input = fs.readFileSync(filePath, 'utf-8').trim();

// 1. Parse input
const [rulesSection, updatesSection] = input.split('\n\n');

type Rule = [number, number];

const rules: Rule[] = rulesSection
  .split('\n')
  .map(line => {
    const [x, y] = line.split('|').map(Number);
    return [x, y] as Rule;
  });

const updates: number[][] = updatesSection
  .split('\n')
  .map(line => line.split(',').map(Number));

// 2. Check if an update is correct
function isUpdateCorrect(update: number[], rules: Rule[]): boolean {
  const valueIndexObject: Record<number, number> = {};
  update.forEach((num, i) => {
    valueIndexObject[num] = i;
  });

  for (const [x, y] of rules) {
    if (x in valueIndexObject && y in valueIndexObject) {
      if (valueIndexObject[x] >= valueIndexObject[y]) {
        return false;
      }
    }
  }
  return true;
}

// 3. Topological sort for fixing invalid updates
function topologicalSort(pages: number[], rules: Rule[]): number[] {
  // Build graph
  const graph: Map<number, Set<number>> = new Map();
  const inDegree: Map<number, number> = new Map();

  for (const page of pages) {
    graph.set(page, new Set());
    inDegree.set(page, 0);
  }

  for (const [x, y] of rules) {
    if (graph.has(x) && graph.has(y)) {
      if (!graph.get(x)!.has(y)) {
        graph.get(x)!.add(y);
        inDegree.set(y, inDegree.get(y)! + 1);
      }
    }
  }

  // Kahn's algorithm
  const queue: number[] = [];
  for (const [page, deg] of inDegree.entries()) {
    if (deg === 0) queue.push(page);
  }

  const result: number[] = [];
  while (queue.length > 0) {
    // To match sample output, sort queue descending before popping
    queue.sort((a, b) => b - a);
    const node = queue.pop()!;
    result.push(node);
    for (const neighbor of graph.get(node)!) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  if (result.length !== pages.length) {
    throw new Error('Cycle detected or missing nodes');
  }
  return result;
}

// 4. Calculate sums for part 1 and part 2
let middleSumPart1 = 0;
let middleSumPart2 = 0;

for (const update of updates) {
  if (isUpdateCorrect(update, rules)) {
    const mid = Math.floor(update.length / 2);
    middleSumPart1 += update[mid];
  } else {
    // Only use rules relevant to this update
    const updateSet = new Set(update);
    const relevantRules = rules.filter(([x, y]) => updateSet.has(x) && updateSet.has(y));
    const sortedUpdate = topologicalSort(update, relevantRules);
    const mid = Math.floor(sortedUpdate.length / 2);
    middleSumPart2 += sortedUpdate[mid];
  }
}

console.log('Solution for 05/2024...');
console.log('Middle sum part 1:', middleSumPart1);
console.log('Middle sum part 2:', middleSumPart2);
