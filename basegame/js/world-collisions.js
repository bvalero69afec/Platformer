const GAMESTATE_IN_PROGRESS = 0;
const GAMESTATE_LOSE = 1;
const GAMESTATE_WIN = 2;

function handlePlayerFloorCollision(world){
  const player = world.player;
  // Check if the player is falling
  if (player.velocityY < 0) {
    if (player.y + player.velocityY < world.groundY) { // Check if the player is above the ground
      player.velocityY = world.groundY - player.y; // Prevent the player from falling below the ground
    }
  }
}

function handlePlayerLeftBorderCollision(world) {
  const player = world.player;
  // Check if the player is moving left
  if (player.velocityX < 0) {
    if (player.x + player.velocityX < 0) { // Check if the player is going out of bounds
      player.velocityX = -player.x; // Prevent the player from going out of bounds
    }
  }
}

function handlePlayerTopBorderCollision(world) {
  const player = world.player;
  // Check if the player is moving up
  if (player.velocityY > 0) {
    if (player.y + player.height + player.velocityY > world.height) {
      player.velocityY = world.height - (player.y + player.height);
    }
  }
}

function isRectangleCollidingRectangle(rect1, rect2) {
  return (
    // Check if axes of rectangles are overlapping
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function handlePlayerObstaclesCollision(world) {
  const player = world.player;
  const playerNewPosRect = {
    x: player.x + player.velocityX,
    y: player.y + player.velocityY,
    width: player.width,
    height: player.height
  };
  for (const obstacle of world.obstacles) {
      if (isRectangleCollidingRectangle(playerNewPosRect, obstacle)) {
          if (!player.cheats.invincible) {
            return GAMESTATE_LOSE;
          }
      }
  }

  return GAMESTATE_IN_PROGRESS;
}

function handlePlayerRightBorderCollision(world) {
  const player = world.player;
  if (player.velocityX > 0) {
    if (player.x + player.width + player.velocityX > world.width) {
      return GAMESTATE_WIN;
    }
  }

  return GAMESTATE_IN_PROGRESS;
}

function handlePlayerCollisions(world) {
  handlePlayerFloorCollision(world);
  
  handlePlayerLeftBorderCollision(world);
  handlePlayerTopBorderCollision(world);

  if (handlePlayerObstaclesCollision(world) === GAMESTATE_LOSE) {
    return GAMESTATE_LOSE;
  }

  return handlePlayerRightBorderCollision(world);
}