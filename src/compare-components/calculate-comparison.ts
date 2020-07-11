import { Comparison } from '../store/types';
import Piece, { PieceList } from '../piece-enum';

export enum ComparisonChoice {
  FIRST,
  SECOND,
  SAME,
};

// As https://meatfighter.com/nintendotetrisai/#Picking_Tetriminos says, there is often bias on which pieces to pick that
// makes choosing not random enough. This can result in preferring one option due to a small probability difference.
const biasedChanceMap = {
  [Piece.I]: 7 / 56,
  [Piece.O]: 8 / 56,
  [Piece.T]: 9 / 56,
  [Piece.J]: 8 / 56,
  [Piece.L]: 7 / 56,
  [Piece.S]: 9 / 56,
  [Piece.Z]: 8 / 56,
}

const getPieceProbabilities = (latestPiece: Piece) => {
  return {
    [Piece.I]: (latestPiece === Piece.I ? 0 : 1/8) + ((1/4) * biasedChanceMap[Piece.I]),
    [Piece.O]: (latestPiece === Piece.O ? 0 : 1/8) + ((1/4) * biasedChanceMap[Piece.O]),
    [Piece.T]: (latestPiece === Piece.T ? 0 : 1/8) + ((1/4) * biasedChanceMap[Piece.T]),
    [Piece.J]: (latestPiece === Piece.J ? 0 : 1/8) + ((1/4) * biasedChanceMap[Piece.J]),
    [Piece.L]: (latestPiece === Piece.L ? 0 : 1/8) + ((1/4) * biasedChanceMap[Piece.L]),
    [Piece.S]: (latestPiece === Piece.S ? 0 : 1/8) + ((1/4) * biasedChanceMap[Piece.S]),
    [Piece.Z]: (latestPiece === Piece.Z ? 0 : 1/8) + ((1/4) * biasedChanceMap[Piece.Z]),
  }
}

export default (nextPiece: Piece, comparison: Comparison): ComparisonChoice => {
  const pieceProbabilities = getPieceProbabilities(nextPiece);

  let firstCount = 0;
  let secondCount = 0;

  PieceList.forEach(({ value }: { value: Piece }) => {
    const weightedValue = pieceProbabilities[value];

    switch (comparison[value])
    {
      case comparison.firstOption.id:
        firstCount += weightedValue;
        break;
      case comparison.secondOption.id:
        secondCount += weightedValue;
        break;
      default:
        break;
    }
  });

  if (firstCount > secondCount) {
    return ComparisonChoice.FIRST;
  } else if (firstCount < secondCount) {
    return ComparisonChoice.SECOND;
  } else {
    return ComparisonChoice.SAME;
  }
};