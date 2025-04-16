function calculatePlayerScore(world, obstacleAreaX, obstacleAreaWidth) {
  const player = world.player;

  return Math.floor(mathClamp(player.x - obstacleAreaX, 0, obstacleAreaWidth));
}