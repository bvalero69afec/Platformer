const keysDown = {};

function updatePlayerControls() {
  const controls = world.player.controls;
  controls.moveLeft = keysDown['ArrowLeft'] || keysDown['q'];
  controls.moveRight = keysDown['ArrowRight'] || keysDown['d'];
  controls.jump = keysDown['ArrowUp'] || keysDown['z'] || keysDown[' '];
}

function togglePlayerCheats(key) {
  const cheats = world.player.cheats;
  if (key === 'g') {
    cheats.invincible = !cheats.invincible;
  }
  if (key === 'f') {
    cheats.fly = !cheats.fly;
  }
}

document.addEventListener('keydown', function(event) {
  const key = event.key;
  if (!keysDown[key]) {
    keysDown[key] = true;
    updatePlayerControls();
    togglePlayerCheats(key);
  }
});

document.addEventListener('keyup', function(event) {
  const key = event.key;
  if (keysDown[key]) {
    keysDown[key] = false;
    updatePlayerControls();
  }
});