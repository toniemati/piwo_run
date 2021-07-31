export default class Player {
  
  constructor(gameBoard, emoji, speed) {
    this.gameBoard = gameBoard;
    this.emoji = emoji;
    this.speed = speed;
    this.x = gameBoard.clientWidth / 2;
    this.y = gameBoard.clientHeight / 2;
  }

  update(keys) {
    //* move player upp
    if (keys['ArrowUp']) {
      if (this.y - 30 <= 0);
      else this.y -= this.speed;
    }

    //* move player down
    if (keys['ArrowDown']) {
      if (this.y + 30 >= this.gameBoard.clientHeight);
      else this.y += this.speed;
    }

    //* move player leftie
    if (keys['ArrowLeft']) {
      if (this.x - 25 <= 0);
      else this.x -= this.speed;
    }

    //* move player rightie
    if (keys['ArrowRight']) {
      if (this.x + 25 >= this.gameBoard.clientWidth);
      else this.x += this.speed;
    }

  }

  draw() {
    const playerEl = document.createElement('div');
    playerEl.classList.add('player');
    playerEl.innerHTML = this.emoji;
    this.gameBoard.appendChild(playerEl);
    playerEl.style.left = `${this.x}px`;
    playerEl.style.top = `${this.y}px`;
  }
}