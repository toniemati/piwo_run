export default class Enemy {

  speed = {
    x: 0,
    y: 0,
  }

  constructor(gameBoard, player, imgUrl, name) {
    this.gameBoard = gameBoard;
    this.player = player;
    this.imgUrl = imgUrl;
    this.name = name;

    this.setSpeed();
    this.setPosition();
  }

  setSpeed() {
    this.speed.x = Math.floor(Math.random() * 4 + 1) * (Math.round(Math.random()) ? 1 : -1);
    this.speed.y = Math.floor(Math.random() * 4 + 1) * (Math.round(Math.random()) ? 1 : -1);
  }

  setPosition() {
    let left, top;

    while(
      !left ||
      left - 50 <= 0 ||
      left + 50 >= this.gameBoard.clientWidth ||
      (left + 50 >= this.player.x - 125 && 
      left - 50 <= this.player.x + 125)
    )
      left = Math.floor(Math.random() * this.gameBoard.clientWidth);


    while(
      !top ||
      top - 75 <= 0 ||
      top + 75 >= this.gameBoard.clientHeight ||
      (top + 75 >= this.player.y - 130 && 
      top - 75 <= this.player.y + 130)
    )
      top = Math.floor(Math.random() * this.gameBoard.clientWidth);


    this.x = left;
    this.y = top;
  }

  update() {
    if (this.x - 50 <= 0 || this.x + 50 >= this.gameBoard.clientWidth) this.speed.x *= -1;
    if (this.y - 75 <= 0 || this.y + 75 >= this.gameBoard.clientHeight) this.speed.y *= -1;

    this.x += this.speed.x;
    this.y += this.speed.y;
  }

  draw() {
    const enemyEl = document.createElement('div')
    const enemyImg = new Image();
    enemyImg.src = this.imgUrl;
    enemyEl.classList.add('enemy');
    enemyEl.style.left = `${this.x}px`;
    enemyEl.style.top = `${this.y}px`;
    enemyEl.appendChild(enemyImg);
    this.gameBoard.appendChild(enemyEl);
  }
}