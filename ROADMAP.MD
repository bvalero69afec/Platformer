ROADMAP:


Base game:
- black background.
- white filled square representing the player.
- a continous white filled line (with some pixels for the height), at y like 1/4 of the canvas height starting from the bottom. This represent the floor.
- The player spawn at the start close to the left border on the floor.
- white filled triangles on the floor representing the spikes. 
  They are randomly generated. 
  They must not be to close to the borders at the start or at the end to leave space and let the player breath.
  They must not be to close to each other when generated to let the player jump between them and so the level is winnable.
- The player must collide with the floor.
- The player can't go beyond the borders he must collide.
  When the player collide with the right border it's win.
  When the player collide with the bottom border, it's loss (he should not because the floor is continous for the moment).
- When the player collide with the spikes, it's loss.
- For game logic and readability, we should use the origin at the bottom left of the canvas for x and y position, so it's start at 0 there. Not the top left one which is used for the canvas. We should translate the position between them.
- Do movement physics. The player can go left side, right side and jump.
- The world/player are continually under gravity.
- We must have good collision behaviour.

Improvement:
Sprites (we will need to rework the collision system).
Platform generated at different height (no continous floor).
Big level with camera panning.
