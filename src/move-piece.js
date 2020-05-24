import PieceTypes from './piece-types';
import _ from 'lodash';

function movePiece(currentPiece, grid, previousPiece = null) {
  const newGrid = _.cloneDeep(grid);

  const { row, column, type, orientation } = currentPiece;

  if (previousPiece && previousPiece.orientation !== currentPiece.orientation) {
    drawPiece(newGrid, row, column, previousPiece.orientation, type, 0);
  }
  drawPiece(newGrid, row, column, orientation, type);

  return newGrid;
}

const drawMap = {
  [PieceTypes.O]: drawO,
  [PieceTypes.I]: drawI,
  [PieceTypes.T]: drawT,
  [PieceTypes.L]: drawL,
  [PieceTypes.J]: drawJ,
  [PieceTypes.S]: drawS,
  [PieceTypes.Z]: drawZ,
}
function drawPiece(grid, row, column, orientation, type, value) {
  drawMap[type](grid, row, column, orientation, value);
}

function drawO(grid, row, column, _, value = 3) {
  grid[row][column] = value;
  grid[row][column-1] = value;
  grid[row+1][column] = value;
  grid[row+1][column-1] = value;
}

function drawI(grid, row, column, orientation, value = 3) {
  switch (orientation) {
    case 0:
    case 2:
      grid[row][column-2] = value;
      grid[row][column-1] = value;
      grid[row][column] = value;
      grid[row][column+1] = value;
      break;
    case 1:
    case 3:
      grid[row-2][column] = value;
      grid[row-1][column] = value;
      grid[row][column] = value;
      grid[row+1][column] = value;
      break;
    default:
        throw new Error('Unknown orientation');
  }
}

function drawT(grid, row, column, orientation, value = 3) {
  switch (orientation) {
    case 0:
      grid[row][column-1] = value;
      grid[row][column] = value;
      grid[row][column+1] = value;
      grid[row+1][column] = value;
      break;
    case 1:
      grid[row-1][column] = value;
      grid[row][column-1] = value;
      grid[row][column] = value;
      grid[row+1][column] = value;
      break;
    case 2:
      grid[row-1][column] = value;
      grid[row][column-1] = value;
      grid[row][column] = value;
      grid[row][column+1] = value;
      break;
    case 3:
      grid[row-1][column] = value;
      grid[row][column+1] = value;
      grid[row][column] = value;
      grid[row+1][column] = value;
      break;
    default:
      throw new Error('Unknown orientation');
  }
}

function drawL(grid, row, column, orientation, value = 3) {
  switch (orientation) {
    case 0:
      grid[row][column-1] = value;
      grid[row][column] = value;
      grid[row][column+1] = value;
      grid[row+1][column-1] = value;
      break;
    case 1:
      grid[row-1][column] = value;
      grid[row][column] = value;
      grid[row+1][column] = value;
      grid[row+1][column+1] = value;
      break;
    case 2:
      grid[row-1][column+1] = value;
      grid[row][column-1] = value;
      grid[row][column] = value;
      grid[row][column+1] = value;
      break;
    case 3:
      grid[row-1][column] = value;
      grid[row-1][column-1] = value;
      grid[row][column] = value;
      grid[row+1][column] = value;
      break;
    default:
      throw new Error('Unknown orientation');
  }
}

function drawJ(grid, row, column, orientation, value = 3) {
  switch (orientation) {
    case 0:
      grid[row][column-1] = value;
      grid[row][column] = value;
      grid[row][column+1] = value;
      grid[row+1][column+1] = value;
      break;
    case 1:
      grid[row-1][column] = value;
      grid[row-1][column+1] = value;
      grid[row][column] = value;
      grid[row+1][column] = value;
      break;
    case 2:
      grid[row-1][column-1] = value;
      grid[row][column-1] = value;
      grid[row][column] = value;
      grid[row][column+1] = value;
      break;
    case 3:
      grid[row-1][column] = value;
      grid[row][column] = value;
      grid[row+1][column] = value;
      grid[row+1][column-1] = value;
      break;
    default:
      throw new Error('Unknown orientation');
  }
}

function drawS(grid, row, column, orientation, value = 3) {
  switch (orientation) {
    case 0:
    case 2:
      grid[row][column] = value;
      grid[row][column+1] = value;
      grid[row+1][column] = value;
      grid[row+1][column-1] = value;
      break;
    case 1:
    case 3:
      grid[row-1][column] = value;
      grid[row][column] = value;
      grid[row][column+1] = value;
      grid[row+1][column+1] = value;
      break;
    default:
      throw new Error('Unknown orientation');
  }
}

function drawZ(grid, row, column, orientation, value = 3) {
  switch (orientation) {
    case 0:
    case 2:
      grid[row][column-1] = value;
      grid[row][column] = value;
      grid[row+1][column] = value;
      grid[row+1][column+1] = value;
      break;
    case 1:
    case 3:
      grid[row-1][column+1] = value;
      grid[row][column] = value;
      grid[row][column+1] = value;
      grid[row+1][column] = value;
      break;
    default:
      throw new Error('Unknown orientation');
  }
}

export default movePiece;