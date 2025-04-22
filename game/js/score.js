//Calculate the score based on the player's position relative to the obstacle area
function calculatePlayerScore(world) {
  const player = world.player;

  const obstacleAreaXStart = world.startAreaWidth;
  const obstacleAreaXEnd = obstacleAreaXStart + world.obstacleAreaWidth;

  const playerXClamped = mathClamp(player.x, obstacleAreaXStart, obstacleAreaXEnd);
  const clampedDistanceToObstacleAreaStart = playerXClamped - obstacleAreaXStart;
  const flooredClampedDistance = Math.floor(clampedDistanceToObstacleAreaStart);

  return flooredClampedDistance;
}