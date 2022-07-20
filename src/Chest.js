import Entity from "./Entity";
import Spawner from "./Spawner";
import ChestCreak from './assets/sounds/chestCreak.wav'
import MimicSound from './assets/sounds/mimicSound.wav'

const chestCreak = new Audio(ChestCreak)
const mimicSound = new Audio(MimicSound)

class Chest extends Entity {
  constructor(x, y, size, attributes, mimic = false) {
    super(x, y, size, attributes)
    this.mimic = mimic;
  }
  action(verb, world) {
    if (verb === "bump") {
      let spawner = new Spawner(world);
      if(this.mimic === true) {
        world.remove(this);
        spawner.spawnMimic(this.x, this.y)
        mimicSound.play()
        return;
      }
      spawner.spawnChestLootAt(this.x, this.y);
      chestCreak.play()

      world.remove(this);
    }

    if (verb === "fireball") {
      world.remove(this);
    }
  }
}

export default Chest;
