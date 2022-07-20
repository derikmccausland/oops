import Entity from "./Entity.js";
import Spawner from "./Spawner.js";
import StairSound from "./assets/sounds/stairs.mp3";
import { HexContext } from "./HexContext.js";

const stairSound = new Audio(StairSound);

const story = "#CACACA"
const normal = "#FFFFFF"

class Stairs extends Entity {
  static contextType = HexContext

  attributes = {
    spriteSheet: "terrainAtlas",
    spriteSheetCoordinates: {
      x: 432,
      y: 96,
    },
  };

  action(verb, world) {
    if (verb === "bump") {
      stairSound.play();
      world.addToHistory(["You move down the stairs...", story]);
      world.tier += 1;
      if (world.tier > 3) {
        //spawn boss room here
        world.tier = "boss";
        world.addToHistory(["You suddenly feel a sense of impending doom...", story]);
        world.createBossMap();
        world.player.x = 0;
        world.player.y = 0;
        world.moveToSpace(world.player);
        world.entities = world.entities.filter((e) => e === world.player);
        let spawner = new Spawner(world);
        spawner.spawnBoss();
        return;
      }
      world.addToHistory([`LEVEL ${world.tier}`, normal]);
      world.createCellularMap();
      world.player.x = 0;
      world.player.y = 0;
      world.moveToSpace(world.player);
      world.entities = world.entities.filter((e) => e === world.player);
      let spawner = new Spawner(world);
      spawner.spawnLoot(6);
      spawner.spawnMimicChest();
      spawner.spawnMonsters(100);
      spawner.spawnStairs();
    }
  }
}

export default Stairs;
