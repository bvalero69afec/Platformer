function calculateCameraOffsetX(world, canvasWidth, margin) {
  const player = world.player;
  const screenCenter = canvasWidth / 2;
  const cameraX = mathClamp(player.x - screenCenter + margin, 0, world.width - canvasWidth);
  return cameraX;
}

function drawBackground(ctx, world, canvasWidth, margin) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);

  const cameraX = calculateCameraOffsetX(world, canvasWidth, margin);
  ctx.translate(-cameraX, 0);

  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0, 0, world.width, world.height);
  ctx.restore();
}

function drawFloor(ctx, world, canvasWidth, margin) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);

  const cameraX = calculateCameraOffsetX(world, canvasWidth, margin);
  ctx.translate(-cameraX, 0);

  ctx.fillStyle = 'brown';
  ctx.fillRect(0, world.groundY - world.floorHeight, world.width, world.floorHeight);
  ctx.restore();
}

function drawObstacles(ctx, world, canvasWidth, margin) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);

  const cameraX = calculateCameraOffsetX(world, canvasWidth, margin);
  ctx.translate(-cameraX, 0);

  ctx.fillStyle = 'red';
  for (const obstacle of world.obstacles) {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }
  ctx.restore();
}

function drawPlayer(ctx, world, canvasWidth, margin) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);

  const cameraX = calculateCameraOffsetX(world, canvasWidth, margin);
  ctx.translate(-cameraX, 0);

  ctx.fillStyle = 'purple';
  const player = world.player;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.restore();
}

function drawWorld(ctx, world, canvasWidth, margin) {
  drawBackground(ctx, world, canvasWidth, margin);
  drawFloor(ctx, world, canvasWidth, margin);
  drawObstacles(ctx, world, canvasWidth, margin);
  drawPlayer(ctx, world, canvasWidth, margin);
}