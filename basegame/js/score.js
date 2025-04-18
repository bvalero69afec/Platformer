//Calculate the score based on the player's position relative to the obstacle area
function calculatePlayerScore(world) {
  const player = world.player;
  const obstacleAreaX = world.startAreaWidth;

  const playerXClampedAtMin = Math.max(player.x, obstacleAreaX);
  const distanceToObstacleAreaStart = playerXClampedAtMin - obstacleAreaX;
  const distanceClampedToObstacleArea = Math.min(distanceToObstacleAreaStart, world.obstacleAreaWidth);
  const flooredClampedDistance = Math.floor(distanceClampedToObstacleArea);
  return flooredClampedDistance;
}