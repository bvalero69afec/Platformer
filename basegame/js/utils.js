//[min, max)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function mathClamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}