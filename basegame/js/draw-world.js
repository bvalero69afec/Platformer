function calculatePlayerCameraX(world, canvasWidth, cameraCanvasCenterXOffset) {
  const player = world.player;
  const canvasCenterX = canvasWidth / 2;
  //Center the camera on the player but account for the offset
  const cameraX = mathClamp(player.x - (canvasCenterX + cameraCanvasCenterXOffset), 0, world.width - canvasWidth);
  return cameraX;
}

function drawBackground(ctx, world, cameraX, cameraY) {
  ctx.save();
  ctx.translate(0, world.height); // Move the origin to the bottom left corner
  ctx.scale(1, -1); // Flip the y-axis
  ctx.translate(-cameraX, -cameraY); // Move the origin to the camera position
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0, 0, world.width, world.height);
  ctx.restore();
}

function drawFloor(ctx, world, cameraX, cameraY) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);
  ctx.translate(-cameraX, -cameraY);
  ctx.fillStyle = 'brown';
  ctx.fillRect(0, world.groundY - world.floorHeight, world.width, world.floorHeight);
  ctx.restore();
}

function drawObstacles(ctx, world, cameraX, cameraY) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);
  ctx.translate(-cameraX, -cameraY);
  ctx.fillStyle = 'red';
  for (const obstacle of world.obstacles) {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }
  ctx.restore();
}

function drawPlayer(ctx, world, cameraX, cameraY) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);
  ctx.translate(-cameraX, -cameraY);
  ctx.fillStyle = 'purple';
  const player = world.player;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.restore();
}

function drawWorld(ctx, world, cameraX, cameraY) {
  drawBackground(ctx, world, cameraX, cameraY);
  drawFloor(ctx, world, cameraX, cameraY);
  drawObstacles(ctx, world, cameraX, cameraY);
  drawPlayer(ctx, world, cameraX, cameraY);
}