import Player from "./Player.js";
import Enemy from "./Enemy.js";

const gameBoard = document.querySelector('#gameboard');
const playerSpeed = 5;
let player, keys, enemies;
const FPS = 60;
let lastRenderTime = 0;
let enemiesInterval;

const enemiesArr = [
  { name: 'battek', img: '../img/bartek.png'},
  { name: 'kamil', img: '../img/kamil.png'},
  { name: 'pawel', img: '../img/pawel.png'},
  { name: 'miki', img: '../img/miki.png'},
  { name: 'robert', img: '../img/robert.png'},
  { name: 'szymon', img: '../img/szymon.png'},
  { name: 'mati', img: '../img/mati.png'},
];

const animate = (currentTime) => {
  const secSinceLastRender = (currentTime - lastRenderTime) / 1000;
  requestAnimationFrame(animate)
  if (secSinceLastRender < 1 / FPS) return;
  lastRenderTime = currentTime;

  update();
  draw();
}


const update = () => {
  if (checkPlayerEnemyCollision()) {
    alert(`Przeżyłeś tylko ${enemies.length} napalonych na piwo ziomali 😿`);
    newGame();
  }

  player.update(keys);
  enemies.forEach((enemy) => enemy.update());
}

const addNewEnemy = () => {
  const idx = Math.floor(Math.random() * enemiesArr.length);
  const el = enemiesArr[idx];
  const enemy = new Enemy(gameBoard, player, el.img, el.name);
  enemies.push(enemy);
};

const draw = () => {
  gameBoard.innerHTML = '';

  player.draw();
  enemies.forEach((enemy) => enemy.draw());
}

const checkPlayerEnemyCollision = () => {
  return enemies.some((enemy) => (
    player.x - 25 < enemy.x + 50 &&
    player.x + 25 > enemy.x - 50 &&
    player.y - 30 < enemy.y + 75 &&
    player.y + 30 > enemy.y - 75
  ))
};

const newGame = () => {
  clearInterval(enemiesInterval);
  player = new Player(gameBoard, '🍺', playerSpeed);
  keys = [];
  enemies = [];

  addNewEnemy();

  enemiesInterval = setInterval(() => {
    addNewEnemy();
  }, 2000);

  requestAnimationFrame(animate);
};

newGame();

window.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowUp':
      keys[e.code] = true;
      break;
    case 'ArrowDown':
      keys[e.code] = true;
      break;
    case 'ArrowLeft':
      keys[e.code] = true;
      break;
    case 'ArrowRight':
      keys[e.code] = true;
      break;
  }
});

window.addEventListener('keyup', (e) => {
  delete keys[e.code];
})
