function drawBackground(ctx, world, canvasWidth, margin) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);
  ctx.fillStyle = 'lightblue';

  const player = world.player;
  const screenCenter = canvasWidth / 2;
  const cameraX = Math.max(0, Math.min(world.width - canvasWidth, player.x - screenCenter + margin));

  ctx.fillRect(-cameraX, 0, world.width, world.height);
  ctx.restore();
}

function drawFloor(ctx, world, canvasWidth, margin) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);
  ctx.fillStyle = 'brown';

  const player = world.player;
  const screenCenter = canvasWidth / 2;
  const cameraX = Math.max(0, Math.min(world.width - canvasWidth, player.x - screenCenter + margin));

  ctx.fillRect(-cameraX, world.groundY - world.floorHeight, world.width, world.floorHeight);
  ctx.restore();
}

function drawObstacles(ctx, world, canvasWidth, margin) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);
  ctx.fillStyle = 'red';

  const player = world.player;
  const screenCenter = canvasWidth / 2;
  const cameraX = Math.max(0, Math.min(world.width - canvasWidth, player.x - screenCenter + margin));

  for (const obstacle of world.obstacles) {
    ctx.fillRect(obstacle.x - cameraX, obstacle.y, obstacle.width, obstacle.height);
  }
  ctx.restore();
}

function drawPlayer(ctx, world, canvasWidth, margin) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);
  ctx.fillStyle = 'purple';

  const player = world.player;
  const screenCenter = canvasWidth / 2;
  const cameraX = Math.max(0, Math.min(world.width - canvasWidth, player.x - screenCenter + margin));

  ctx.fillRect(player.x - cameraX, player.y, player.width, player.height);
  ctx.restore();
}

function drawWorld(ctx, world, canvasWidth, margin) {
  drawBackground(ctx, world, canvasWidth, margin);
  drawFloor(ctx, world, canvasWidth, margin);
  drawObstacles(ctx, world, canvasWidth, margin);
  drawPlayer(ctx, world, canvasWidth, margin);
}