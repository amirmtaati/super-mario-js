import Timer from "./Timer.js";
import { LevelLoader } from "./loader.js";
import { createMario } from "./entities.js";
import { createCollisionLayer } from "./layers.js";
import { setupKeyboard } from "./keyboard/input.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([createMario(), LevelLoader("1-1")]).then(([mario, level]) => {
  mario.pos.set(64, 64);

  createCollisionLayer(level);

  level.entities.add(mario);

  const input = setupKeyboard(mario);
  input.listenTo(window);

  const timer = new Timer(1 / 60);
  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.comp.draw(context);
  };

  timer.start();
});
