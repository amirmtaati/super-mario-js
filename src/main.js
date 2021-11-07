import Compositor from "./Compositor.js";
import Timer from "./Timer.js";
import { LevelLoader } from "./loader.js";
import { createMario } from "./entities.js";
import { loadBackgroundSprites } from "./sprites/sprites.js";
import { createSpriteLayer , createBackgroundLayer } from "./layers.js";

import Keyboard from "./keyboard/KeyboardState.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");


Promise.all([
  createMario(),
  loadBackgroundSprites(),
  LevelLoader('1-1'),
])
.then(([mario , bgSprites , level]) => {
  const comp = new Compositor();

  const bgLayer = createBackgroundLayer(level.backgrounds , bgSprites);
  comp.layers.push(bgLayer);

  const gravity = 2000;
  mario.pos.set(64 , 175);
  

  const SPACE = 32;
  const input = new Keyboard();
  input.addMapping(SPACE , keyState => {
    if(keyState) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });
  input.listenTo(window);

  const spriteLayer = createSpriteLayer(mario);
  comp.layers.push(spriteLayer);

  const timer = new Timer(1 / 60);
  timer.update = function update(deltaTime) {
    mario.update(deltaTime);
    comp.draw(context);
    //mario.vel.y += gravity * deltaTime;
  }

  timer.start();
})