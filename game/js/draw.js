function drawText(ctx, text, font, style, align, baseline, x, y) {
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = style;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawCenteredText(ctx, text, font, style, width, height) {
  const x = width / 2;
  const y = height / 2;
  drawText(ctx, text, font, style, 'center', 'middle', x, y);
}