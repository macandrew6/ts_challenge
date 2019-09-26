import * as Settings from './settings';

export class Apple {
  private cellWidth: number;
  private cellHeight: number;
  
  constructor (public x: number, public y: number, canvas: HTMLCanvasElement) {
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    this.cellWidth = canvasWidth / Settings.board.dimX
    this.cellHeight = canvasHeight / Settings.board.dimX
    // this.x = 5;
    // this.y = 9;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'green';
    ctx.fillRect(
      this.x * this.cellWidth + 4,
      this.y * this.cellHeight + 4,
      15,
      15
    )
  };

  private move() {
    // picks a random place on the board to put apple
  }
}