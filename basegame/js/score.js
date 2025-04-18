//Calculate the score based on the player's position relative to the obstacle area
function calculatePlayerScore(world, obstacleAreaX, obstacleAreaWidth) {
  const player = world.player;

  const playerXClampedAtMin = Math.max(player.x, obstacleAreaX);
  const distanceToObstacleAreaStart = playerXClampedAtMin - obstacleAreaX; 
  const distanceClampedToObstacleArea = Math.min(distanceToObstacleAreaStart, obstacleAreaWidth);
  const flooredClampedDistance = Math.floor(distanceClampedToObstacleArea);
  return flooredClampedDistance;
}