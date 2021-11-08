import Compositor from "./Compositor";

export default class Level {
  constructor() {
    this.comp = new Compositor();
    this.entities = new Set();
  }
}
