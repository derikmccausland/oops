import Entity from "./Entity";

const fireballUp = {
  spriteSheet: "fxAtlas",
  spriteSheetCoordinates: {
    x: 24,
    y: 192,
  },
};

const fireballDown = {
  spriteSheet: "fxAtlas",
  spriteSheetCoordinates: {
    x: 72,
    y: 192,
  },
};

const fireballLeft = {
  spriteSheet: "fxAtlas",
  spriteSheetCoordinates: {
    x: 48,
    y: 192,
  },
};

const fireballRight = {
  spriteSheet: "fxAtlas",
  spriteSheetCoordinates: {
    x: 0,
    y: 192,
  },
};

class Fireball extends Entity {
  constructor(x, y, size, fireDirection) {
    super(x, y, size, {});
    this.fireDirection = fireDirection;

    if (fireDirection === "up") {
      this.attributes = fireballUp;
    } else if (fireDirection === "down") {
      this.attributes = fireballDown;
    } else if (fireDirection === "left") {
      this.attributes = fireballLeft;
    } else if (fireDirection === "right") {
      this.attributes = fireballRight;
    }
  }

  copyFireball() {
    let newFireball = new Fireball();
    Object.assign(newFireball, this);
    return newFireball;
  }
}

export default Fireball;
