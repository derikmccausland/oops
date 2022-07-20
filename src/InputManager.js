class InputManager {
  observers = [];

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  broadcast(action, data) {
    this.observers.forEach((subscriber) => subscriber(action, data));
  }

  handleKeys = (e) => {
    e.preventDefault();
    switch (e.keyCode) {
      case 37:
      case 65:
        this.broadcast("move", { x: -1, y: 0 });
        break;
      case 38:
      case 87:
        this.broadcast("move", { x: 0, y: -1 });
        break;
      case 39:
      case 68:
        this.broadcast("move", { x: 1, y: 0 });
        break;
      case 40:
      case 83:
        this.broadcast("move", { x: 0, y: 1 });
        break;
      case 49:
      case 97:
        this.broadcast("inspect", 0);
        break;
      case 50:
      case 98:
        this.broadcast("inspect", 1);
        break;
      case 51:
      case 99:
        this.broadcast("inspect", 2);
        break;
      case 52:
      case 100:
        this.broadcast("inspect", 3);
        break;
      case 53:
      case 101:
        this.broadcast("inspect", 4);
        break;
      case 54:
      case 102:
        this.broadcast("inspect", 5);
        break;
      case 84:
        this.broadcast("addN");
        break;
      case 55:
      case 103:
        this.broadcast("inspectE", "left");
        break;
      case 56:
      case 104:
        this.broadcast("inspectE", "right");
        break;
      case 57:
      case 105:
        this.broadcast("inspectE", "head");
        break;
      case 48:
      case 96:
        this.broadcast("inspectE", "torso");
        break;
      case 27:
        this.broadcast("uninspect")
        break;
      case 69:
        this.broadcast("equip");
        break;
      case 81:
        this.broadcast("unequip");
        break;
      case 71:
        this.broadcast("drop");
        break;
      case 32:
        this.broadcast("rest");
        break;
      default:
        break;
    }
  };

  bindKeys() {
    document.addEventListener("keydown", this.handleKeys);
  }

  unbindKeys() {
    document.removeEventListener("keydown", this.handleKeys);
  }
}

export default InputManager;
