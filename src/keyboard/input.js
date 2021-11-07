import Keyboard from "./KeyboardState.js";

export function setupKeyboard(entity) {
    const input = new Keyboard();

    input.addMapping('Space' , keyState => {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });
}