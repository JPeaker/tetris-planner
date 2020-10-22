/*
 * Heavily drawn from https://github.com/GregoryCannon/TetrisTrainer/blob/master/src/board_loader.js by GregoryCannon,
 * used with permission.
 *
 * Thank you Greg!
 *
 * I'll admit, I took most of this code without really refactoring it, just turning it into Typescript and "puring it up a bit".
 * As a result, it looks a fair bit different to the rest of the codebase. Maybe one day I'll refactor it. But today is not that day.
 */

export default class PasteHandler {
  pasteAreaElement: HTMLDivElement;
  pastedImageElement: HTMLImageElement;

  loadedStateFromImage: boolean;
  loadedBoard: number[][];

  constructor() {
    this.pasteAreaElement = document.getElementById("paste-area") as HTMLDivElement;
    this.pastedImageElement = document.getElementById("pasted-image") as HTMLImageElement;

    this.loadedStateFromImage = false;
    this.loadedBoard = [];
  }

  getBoardStateFromImage(img: HTMLImageElement): number[][] {
    const board: number[][] = [];
    var dummy_canvas = document.getElementById("dummy-canvas") as HTMLCanvasElement;
    var context = dummy_canvas.getContext("2d")!;
    dummy_canvas.width = img.width;
    dummy_canvas.height = img.height;
    context.drawImage(img, 0, 0);

    const cropOffset = -0.3;
    const SQ = (img.height / 20 + img.width / 10) / 2 + cropOffset;
    const rgbEmptyThreshold = 60; // If all three channels are <60/255, then the cell is "empty"

    // Iterate over the image and read the square colors into the board
    for (let c = 0; c < 10; c++) {
      for (let r = 0; r < 20; r++) {
        // First two invisible rows should be empty
        if (!board[r]) {
          board.push([]);
        }

        const x = Math.round((c + 0.5) * SQ);
        const y = Math.round((r + 0.5) * SQ);
        const pixelData = context.getImageData(x, y, 1, 1).data;

        if (
          Math.max(pixelData[0], pixelData[1], pixelData[2]) > rgbEmptyThreshold
        ) {
          let blockValue = 1;
          const randomValue = Math.random();
          if (randomValue > 5 / 7) {
            blockValue = 1;
          } else if (randomValue > 3 / 7) {
            blockValue = 2;
          } else {
            blockValue = 3;
          }
          board[r][c] = blockValue;
        } else {
          board[r][c] = 0;
        }
      }
    }

    const extraRowOne = [];
    for (let c = 0; c < 10; c++) {
      extraRowOne.push(0);
    }

    const extraRowTwo = [];
    for (let c = 0; c < 10; c++) {
      extraRowTwo.push(0);
    }

    board.unshift(extraRowOne);
    board.unshift(extraRowTwo);

    return board;
  }

  setUpPasteability(callback: (grid: number[][]) => void) {
    const that = this;
    // When an image is pasted, get the board state from it
    this.pasteAreaElement.onpaste = function (event: ClipboardEvent) {
      // use event.originalEvent.clipboard for newer chrome versions
      var { items } = event.clipboardData!;
      // find pasted image among pasted items
      var blob = null;
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") === 0) {
          blob = items[i].getAsFile();
        }
      }
      // load image if there is a pasted image
      if (blob !== null) {
        var reader = new FileReader();
        reader.onload = function (event) {
          that.pastedImageElement.onload = function () {
            callback(that.getBoardStateFromImage(that.pastedImageElement));
          };
          that.pastedImageElement.src = event.target!.result as string;
        };
        reader.readAsDataURL(blob);
      }
    };
  }
}