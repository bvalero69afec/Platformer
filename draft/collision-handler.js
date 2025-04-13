const GAMESTATE_IN_PROGRESS = 0;
const GAMESTATE_LOSE = 1;
const GAMESTATE_WIN = 2;

function handleCollisionFloor(player, groundY){
  if (player.velY < 0) {
    if (player.y + player.velY < groundY) {
      player.velY = groundY - player.y;
    }
  }
}

function handleCollisionLeftAndTopBorders(player, leftBorderX, topBorderY) {
  if (player.velX < 0) {
    if (player.x + player.velX < leftBorderX) {
      player.velX = leftBorderX - player.x;
    }
  }

  if (player.velY > 0) {
    if (player.y + player.height + player.velY > topBorderY) {
      player.velY = topBorderY - (player.y + player.height);
    }
  }
}

function isRectangleCollidingRectangle(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function checkWin(player, rightBorderX) {
  if (player.velX > 0) {
    if (player.x + player.width + player.velX > rightBorderX) {
      return GAMESTATE_WIN;
    }
  }

  return GAMESTATE_IN_PROGRESS;
}

function handleCollision(player, groundY, leftBorderX, topBorderY, obstacles, rightBorderX) {
  handleCollisionFloor(player, groundY);
  
  handleCollisionLeftAndTopBorders(player, leftBorderX, topBorderY);

  let playerNewPosRect = { x: player.x + player.velX, y: player.y + player.velY, width: player.width, height: player.height};
  for (const obstacle of obstacles) {
      if (isRectangleCollidingRectangle(playerNewPosRect, obstacle)) {
          return GAMESTATE_LOSE;
      }
  }

  return checkWin(player, rightBorderX);
}