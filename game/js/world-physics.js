function updatePlayerVelocity(world) {
  const player = world.player;
  const controls = player.controls;

  // Update player velocity based on controls
  if (controls.moveLeft && !controls.moveRight) {
    player.velocityX = -player.speed;
  } else if (controls.moveRight && !controls.moveLeft) {
    player.velocityX = player.speed;
  } else {
    player.velocityX = 0;
  }
  if (controls.jump && (player.onGround || player.cheats.fly)) {
    player.velocityY = player.jumpForce;
  }

  player.velocityY -= world.gravity;
}

//Update player position based on velocity
function updatePlayerPosition(world) {
  const player = world.player;
  player.x += player.velocityX;
  player.y += player.velocityY;
}

function updatePlayerOnGroundStatus(world) {
  const player = world.player;
  if (player.y === world.groundY) {
    player.onGround = true;
  } else {
    player.onGround = false;
  }
}

function updatePlayerPhysics(world) {
  updatePlayerVelocity(world);
  gameState = handlePlayerCollisions(world);
  updatePlayerPosition(world);
  updatePlayerOnGroundStatus(world);    
  return gameState;
}