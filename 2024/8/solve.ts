import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'INPUT.md');
const input = fs.readFileSync(filePath, 'utf-8').trim();

console.log('Solution for 08/2024...');
console.log(input)
