function generateObstacles(world, obstacleWidth, obstacleHeight, minObstacleGap, maxObstacleGap,
                           obstaclesStartMinX, obstaclesRightBorderX) {
  world.obstacles = [];
  const randomGapMax = maxObstacleGap - minObstacleGap;
  const endMaxX = obstaclesRightBorderX - obstacleWidth;
  let obstacleX = obstaclesStartMinX;
  while (true)
  {
    const randomGap = getRandomArbitrary(0, randomGapMax);
    obstacleX += randomGap;
    if (obstacleX > endMaxX) {
      break;
    }
    const obstacle = {
      x: obstacleX,
      y: world.groundY,
      width: obstacleWidth,
      height: obstacleHeight
    };
    world.obstacles.push(obstacle);
    obstacleX += obstacleWidth;
    obstacleX += minObstacleGap;
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
    controls: {}
  };
  updatePlayerOnGroundStatus(world);
}