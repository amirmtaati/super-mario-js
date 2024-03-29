const PRESSED = 1;
const RELEASED = 0;

export default class Keyboard{
    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();
    }

    addMapping(keyCode , callback) {
        this.keyMap.set(keyCode , callback);
    }

    handleEvent(event) {
        const { keyCode } = event;

        if(!this.keyMap.has(keyCode)) {
            return;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if(this.keyStates.get(keyCode) === keyState) {
            return;
        }

        this.keyStates.set(keyCode , keyState);

        this.keyMap.get(keyCode)(keyState);
    }

    listenTo(window) {
        ['keydown' , 'keyup'].forEach(eventName => {
            window.addEventListener(eventName , event => {
                this.handleEvent(event);
            })
        })
    }
}