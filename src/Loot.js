import Entity from "./Entity";

class Loot extends Entity {
  action(verb, world) {
    if (verb === "bump") {
      world.addToHistory(world.player.add(this));
      // if (this.attributes.name === "Ring of Domination") {
      //   alert("Congratulations! YOU WIN THE GAME");
      // }
    }

    if (verb === "fireball") {
      world.remove(this);
    }
  }
}

export default Loot;
