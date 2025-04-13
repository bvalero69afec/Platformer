const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 30;
const PLAYER_SPEED = 2;
const PLAYER_JUMP_FORCE = 6;

const GRAVITY = 0.2;

const OBSTACLE_WIDTH = 20;
const OBSTACLE_HEIGHT = 20;
const MIN_OBSTACLE_GAP = 50;
const MAX_OBSTACLE_GAP = 100;

const START_AREA_WIDTH = 150;
const END_AREA_WIDTH = 150;

const GROUND_Y = 100;
const FLOOR_HEIGHT = 20;

const SPAWNPOINT_X = 50;
const SPAWNPOINT_Y = 100;

let world;

let gameState;

function initGame() {
  world = {
    width: canvas.width,
    height: canvas.height,
    gravity: GRAVITY,
    groundY: GROUND_Y,
    floorHeight: FLOOR_HEIGHT,
    spawnpointX: SPAWNPOINT_X,
    spawnpointY: SPAWNPOINT_Y
  };

  generateObstacles(world, OBSTACLE_WIDTH, OBSTACLE_HEIGHT, MIN_OBSTACLE_GAP, MAX_OBSTACLE_GAP,
                    START_AREA_WIDTH, world.width - END_AREA_WIDTH);

  spawnPlayer(world, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SPEED, PLAYER_JUMP_FORCE);

  gameState = GAMESTATE_IN_PROGRESS;
}

function updateGame() {
  if (gameState === GAMESTATE_IN_PROGRESS) {
    gameState = updatePlayerPhysics(world);
  }
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawWorld(ctx, world);
  if (gameState === GAMESTATE_WIN || gameState === GAMESTATE_LOSE) {
    let text;
    if (gameState === GAMESTATE_WIN) {
      ctx.fillStyle = 'gold';
      text = 'You Win!';
    } else {
      ctx.fillStyle = 'darkred';
      text = 'You Lose!';
    }
    ctx.font = '100px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  }
}

function gameLoop() {
  updateGame();
  drawGame();
  if (gameState === GAMESTATE_IN_PROGRESS) {
    requestAnimationFrame(gameLoop);
  }
}

initGame();
gameLoop();