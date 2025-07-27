import { dir } from 'console';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'INPUT.md');
const input = fs.readFileSync(filePath, 'utf-8').trim();


type Direction = 'up' | 'down' | 'left' | 'right';

const roomRowArray = input.split('\n');
const roomDetail = roomRowArray.map(row => row.split(''));
const spacesVisited = new Set<string>()

const NEXT_DIRECTION: Record<Direction, Direction> = {
  'up': 'right',
  'right': 'down',
  'down': 'left',
  'left': 'up'
}

const getStartPoint = (): [number, number, Direction] => {
  for (const [XCoordinate, rowItem] of roomRowArray.entries()) {
    const roomColArray = rowItem.split('');

    for (const [YCoordinate, item] of roomColArray.entries()) {
      if (item === '^') {
        console.log('Starting Position for ^ at:', {XCoordinate, YCoordinate});
        return [XCoordinate, YCoordinate, 'up'];
      }
    }
  }


 return [0, 0, 'down']; 
}

const handleMove = (posX: number, posY: number, direction: Direction): [number,number] => {
  if (direction === 'up') {
    return [posX -= 1, posY];
  } else if (direction === 'down') {
    return [posX += 1, posY];
  } else if (direction === 'left') {
    return [posX, posY -= 1];
  } else if (direction === 'right') {
    return [posX, posY += 1];
  }
  return [posX,posY]
}

const stillInbounds = (posX: number, posY: number): boolean => {
  return posX >= 0 && posX < roomDetail.length && posY >= 0 && posY < roomDetail[0].length;
}

const handleGame = (currentPosX: number, currentPosY: number, currentDirection: Direction): void => {
  spacesVisited.add(`${currentPosX}|${currentPosY}`)
  const nextPotentialPosition = handleMove(currentPosX, currentPosY, currentDirection)
  
  if (stillInbounds(nextPotentialPosition[0], nextPotentialPosition[1])) {
    const nextCharacter = roomDetail[nextPotentialPosition[0]][nextPotentialPosition[1]];
    if (nextCharacter === '.' || nextCharacter === '^') {  
      handleGame(nextPotentialPosition[0], nextPotentialPosition[1], currentDirection);
    } else if (nextCharacter === '#') {
      const newDirection = NEXT_DIRECTION[currentDirection] 
      handleGame(currentPosX, currentPosY, newDirection);
    }
  } else {
    console.log('Out of bounds!')
    console.log("Total Moves:", spacesVisited.size)
  }  
}

const [startPosX, startPosY, startDirection] = await getStartPoint();
handleGame(startPosX, startPosY, startDirection)

console.log('Solution for 06/2024...');
