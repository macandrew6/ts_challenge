import * as Settings from './settings';

type SnakeNode = [number, number];

export class Snake {
  private ctx: CanvasRenderingContext2D;
  private updateFrame: number = 0;
  private canvasWidth: number = 0;
  private canvasHeight: number = 0;
  private cellWidth: number;
  private cellHeight: number;
  private x: number;
  private y: number;
  private direction: [number, number];
  snakeBody: SnakeNode[] = [[5, 5], [4, 5], [3, 5], [2, 5]];

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d");

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.cellWidth = this.canvasWidth / Settings.board.dimX
    this.cellHeight = this.canvasHeight / Settings.board.dimX

    this.x = this.snakeBody[0][0];
    this.y = this.snakeBody[0][1];
    this.direction = [1, 0];

    this.changeDirection = this.changeDirection.bind(this);
    this.update = this.update.bind(this);
    document.addEventListener("keydown", this.changeDirection);
  }

  draw() {
    this.ctx.fillStyle = 'red';
    for (let i = 0; i < this.snakeBody.length; i++) {
      let node = this.snakeBody[i];
      this.ctx.fillRect(
        node[0] * this.cellWidth + 8,
        node[1] * this.cellHeight + 8,
        30,
        30
      )
    }
  }

  updateSnakeBody(head: [number, number]) {
    this.snakeBody.unshift(head);
    this.snakeBody.pop();
  }

  grow() {
    console.log("growing");
  }

  // updateBody() {
  //   for (let i = this.snakeBody.length- 1; i > 0; i++) {
  //     this.snakeBody[i][0] = this.snakeBody[i - 1][0] 
  //     this.snakeBody[i][1] = this.snakeBody[i - 1][1] 
  //   }
  // }

  changeDirection(e: KeyboardEvent) {
    const LEFT_KEY = 37; 
    const RIGHT_KEY = 39; 
    const UP_KEY = 38; 
    const DOWN_KEY = 40;
    const keyPressed = e.keyCode; 
    // finds bug when pressing up and right super quickly the snake will go in 
    // the opposite direction unwanted behavior
    if (keyPressed === LEFT_KEY && this.direction[0] !== 1) { 
      this.direction = [-1, 0];
    }
    if (keyPressed === UP_KEY && this.direction[1] !== 1) { 
      this.direction = [0, -1]; 
    }
    if (keyPressed === RIGHT_KEY && this.direction[0] !== -1) { 
      this.direction = [1, 0]; 
    }
    if (keyPressed === DOWN_KEY && this.direction[1] !== -1) { 
      this.direction = [0, 1]; 
    }
  }

  update() {
    this.updateFrame ++;
    if (this.updateFrame % 10 === 0) {
      // this.updateBody();
      this.x += this.direction[0];
      this.y += this.direction[1];

      if (this.x > Settings.board.dimX - 1) this.x = 0;
      if (this.y > Settings.board.dimY - 1) this.y = 0;
      if (this.x < 0) this.x = Settings.board.dimX;
      if (this.y < 0) this.y = Settings.board.dimY;
      this.updateSnakeBody([this.x, this.y]);
    }
  }
}