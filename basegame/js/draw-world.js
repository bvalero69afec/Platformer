function drawBackground(ctx, world) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(-world.cameraX, 0, world.width, world.height);
  ctx.restore();
}

function drawFloor(ctx, world) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);
  ctx.fillStyle = 'brown';
  ctx.fillRect(-world.cameraX, world.groundY - world.floorHeight, world.width, world.floorHeight);
  ctx.restore();
}

function drawObstacles(ctx, world) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);
  ctx.fillStyle = 'red';
  for (const obstacle of world.obstacles) {
    ctx.fillRect(obstacle.x - world.cameraX, obstacle.y, obstacle.width, obstacle.height);
  }
  ctx.restore();
}

function drawPlayer(ctx, world) {
  ctx.save();
  ctx.translate(0, world.height);
  ctx.scale(1, -1);
  ctx.fillStyle = 'purple';
  const player = world.player;
  ctx.fillRect(player.x - world.cameraX, player.y, player.width, player.height);
  ctx.restore();
}

function drawWorld(ctx, world) {
  drawBackground(ctx, world);
  drawFloor(ctx, world);
  drawObstacles(ctx, world);
  drawPlayer(ctx, world);
}