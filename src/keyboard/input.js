import Keyboard from "./KeyboardState.js";

export function setupKeyboard(entity) {
  const SPACE = 32;
  const ARROW_RIGHT = 39;
  const ARROW_LEFT = 37;

  const input = new Keyboard();
  input.addMapping(SPACE, (keyState) => {
    if (keyState) {
      entity.jump.start();
    } else {
      entity.jump.cancel();
    }
  });

  input.addMapping(ARROW_RIGHT, (keyState) => {
    entity.go.dir = keyState;
  });

  input.addMapping(ARROW_LEFT, (keyState) => {
    entity.go.dir = -keyState;
  });

  return input;
}
