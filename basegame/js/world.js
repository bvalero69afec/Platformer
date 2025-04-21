function generateObstacles(world, obstacleWidth, obstacleHeight, minObstacleGap, maxObstacleGap) {
  world.obstacles = [];
  
  const randomGapMax = maxObstacleGap - minObstacleGap;
  const obstacleAreaX = world.startAreaWidth;
  const obstacleXMax = obstacleAreaX + world.obstacleAreaWidth - obstacleWidth;
  let obstacleX = obstacleAreaX; // Start at the beginning of the obstacle area
  while (true) {
    const randomGap = getRandomArbitrary(0, randomGapMax);
    obstacleX += randomGap;
    // Check if the next obstacle would be outside the obstacle area
    if (obstacleX > obstacleXMax) {
      break;
    }
    const obstacle = {
      x: obstacleX,
      y: world.groundY,
      width: obstacleWidth,
      height: obstacleHeight
    };
    world.obstacles.push(obstacle);
    obstacleX += obstacleWidth; // Move to the right edge of the current obstacle
    obstacleX += minObstacleGap; // Add the minimum gap before the next obstacle
  }
}

function spawnPlayer(world, width, height, speed, jumpForce) {
  world.player = {
    x: world.spawnpointX,
    y: world.spawnpointY,
    width: width,
    height: height,
    velocityX: 0,
    velocityY: 0,
    speed: speed,
    jumpForce: jumpForce,
    controls: {},
    cheats: {}
  };
  updatePlayerOnGroundStatus(world);
}