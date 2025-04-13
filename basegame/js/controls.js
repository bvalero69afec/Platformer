const keysDown = {};

function updatePlayerControls() {
  const controls = world.player.controls;
  controls.moveLeft = keysDown['ArrowLeft'] || keysDown['q'];
  controls.moveRight = keysDown['ArrowRight'] || keysDown['d'];
  controls.jump = keysDown['ArrowUp'] || keysDown['z'] || keysDown[' '];
}

document.addEventListener('keydown', function(event) {
  if (!keysDown[event.key]) {
    keysDown[event.key] = true;
    updatePlayerControls();
  }
});

document.addEventListener('keyup', function(event) {
  if (keysDown[event.key]) {
    keysDown[event.key] = false;
    updatePlayerControls();
  }
});