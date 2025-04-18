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
const OBSTACLE_AREA_WIDTH = 3000;

const START_AREA_WIDTH = 150; //Create safe zone for player to spawn
const END_AREA_WIDTH = 150;

const GROUND_Y = 100;
const FLOOR_HEIGHT = 20;

const SPAWNPOINT_X = 50;
const SPAWNPOINT_Y = 100;

const PLAYER_CAMERA_CENTER_OFFSET_X = -100;

const SCORE_TEXT = 'Score: {score}';
const SCORE_TEXT_FONT = '20px sans-serif';
const SCORE_TEXT_STYLE = 'white';
const SCORE_TEXT_ALIGN = 'left';
const SCORE_TEXT_BASELINE = 'top';
const SCORE_TEXT_X = 10;
const SCORE_TEXT_Y = 10;

const WIN_TEXT = 'You Win!';
const WIN_TEXT_STYLE = 'gold';
const LOSE_TEXT = 'You Lose!';
const LOSE_TEXT_STYLE = 'darkred';
const WIN_LOSE_TEXT_FONT = '100px sans-serif';

let world;

let gameState;

function initGame() {
  world = {
    width: START_AREA_WIDTH + OBSTACLE_AREA_WIDTH + END_AREA_WIDTH, // Total width of the world
    startAreaWidth: START_AREA_WIDTH,
    obstacleAreaWidth: OBSTACLE_AREA_WIDTH,
    endAreaWidth: END_AREA_WIDTH,
    height: canvas.height,
    gravity: GRAVITY,
    groundY: GROUND_Y,
    floorHeight: FLOOR_HEIGHT,
    spawnpointX: SPAWNPOINT_X,
    spawnpointY: SPAWNPOINT_Y,
  };

  generateObstacles(world, OBSTACLE_WIDTH, OBSTACLE_HEIGHT, MIN_OBSTACLE_GAP, MAX_OBSTACLE_GAP);

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
  // Calculate the camera position based on the player's position
  const playerCameraX = calculatePlayerCameraX(world, canvas.width, PLAYER_CAMERA_CENTER_OFFSET_X);
  // Draw the world using the camera position
  drawWorld(ctx, world, playerCameraX, 0);

  const score = calculatePlayerScore(world);
  const scoreFinalText = SCORE_TEXT.replace('{score}', score);
  drawText(ctx, scoreFinalText, SCORE_TEXT_FONT, SCORE_TEXT_STYLE, SCORE_TEXT_ALIGN, SCORE_TEXT_BASELINE,
           SCORE_TEXT_X, SCORE_TEXT_Y);

  if (gameState === GAMESTATE_WIN) {
    drawCenteredText(ctx, WIN_TEXT, WIN_LOSE_TEXT_FONT, WIN_TEXT_STYLE, canvas.width, canvas.height);
  } else if (gameState === GAMESTATE_LOSE) {
    drawCenteredText(ctx, LOSE_TEXT, WIN_LOSE_TEXT_FONT, LOSE_TEXT_STYLE, canvas.width, canvas.height);
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