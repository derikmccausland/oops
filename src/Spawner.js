import { findRenderedComponentWithType } from "react-dom/test-utils";
import Loot from "./Loot";
import Monster from "./Monster";
import Stairs from "./Stairs";
import Chest from "./Chest";
// import BossStart from './assets/sounds/bossStart.wav'
// import BossRoom from './assets/sounds/bossRoom.mp3'

// const bossStart = new Audio(BossStart)
// const bossRoom = new Audio(BossRoom)
// bossRoom.volume = .25

const globalLoot = [
  {
    name: "Rock Pick",
    class: "weapon",
    type: "rock pick",
    mod1: 0,
    mod2: 2,
    charges: 5,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 96,
      x: 528,
    },
  },
  {
    name: "Torch",
    class: "weapon",
    mod1: 4,
    mod2: 1,
    mod3: 3,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 48,
      x: 672,
    },
  },
  {
    name: "Health Tincture",
    class: "healthCon",
    mod1: 25,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 48,
      x: 816,
    },
  },
  {
    name: "Health Potion",
    class: "healthCon",
    mod1: 50,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 0,
      x: 480,
    },
  },
  {
    name: "Elixir of Health",
    class: "healthCon",
    mod1: 25,
    mod2: 25,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 384,
      x: 336,
    },
  },
  {
    name: "Tome of Fireball",
    class: "tome",
    mod1: 10,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 48,
      x: 0,
    },
  },
];

const bossTable = [
  {
    name: "Stuarth",
    attack: 10,
    defense: 19,
    damage: 20,
    health: 200,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 48,
      x: 288,
    },
  },
];

const bossDrop = [
  {
    name: "Ring of Domination",
    spriteSheet: "itemAtlas",
    class: "weapon",
    mod1: 10, 
    mod2: 10,
    spriteSheetCoordinates: {
      y: 336,
      x: 336,
    },
  },
];

const tier3MonsterTable = [
  {
    name: "Demon",
    flavortext: "A massive creature of muscle and flame.",
    attack: 7,
    defense: 8,
    damage: 8,
    health: 17,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 336,
      x: 240,
    },
  },
  {
    name: "Dragon",
    flavortext: "Bright blue gouts of flame burst from its nostrils.",
    attack: 6,
    defense: 9,
    damage: 4,
    health: 31,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 384,
      x: 336,
    },
  },
  {
    name: "Golem",
    attack: 5,
    defense: 6,
    damage: 3,
    flavortext:
      "Every motion is accompanied by the grinding of stone on stone.",
    health: 62,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 432,
      x: 288,
    },
  },
];

const tier2MonsterTable = [
  {
    name: "Banshee",
    flavortext:
      "You'd pity her if her screams weren't forcing you to cover your ears.",
    attack: 5,
    defense: 8,
    damage: 3,
    health: 15,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 192,
      x: 144,
    },
  },
  {
    name: "Ogre",
    attack: 4,
    defense: 5,
    damage: 2,
    flavortext: "The stench is almost overpowering.",
    health: 30,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 144,
      x: 432,
    },
  },
  {
    name: "Torturer",
    flavortext:
      "A tall thin man holding a scalpel that's still dripping with blood.",
    attack: 6,
    defense: 7,
    damage: 7,
    health: 9,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 96,
      x: 0,
    },
  },
];

const tier1MonsterTable = [
  {
    name: "Zombie",
    attack: 3,
    defense: 4,
    damage: 1,
    flavortext:
      "The remains of an adventurer like yourself, brought to life by dark magic.",
    health: 18,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 240,
      x: 144,
    },
  },
  {
    name: "Snake",
    flavortext: "Bright purple poison drips from its fangs.",
    attack: 5,
    defense: 6,
    damage: 6,
    health: 2,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 240,
      x: 240,
    },
  },
  {
    name: "Goblin",
    flavortext: "A goblin holding a rusty iron dagger.",
    attack: 4,
    defense: 7,
    damage: 2,
    health: 9,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 144,
      x: 240,
    },
  },
];

const tier3LootTable = [
  {
    name: "Magic Helmet",
    class: "head",
    mod1: 4,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 432,
      x: 432,
    },
  },
  {
    name: "Magic Armor",
    class: "torso",
    mod1: 4,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 480,
      x: 432,
    },
  },
  {
    name: "Magic Shield",
    class: "shield",
    mod1: 4,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 240,
      x: 816,
    },
  },
  {
    name: "Magic Axe",
    class: "weapon",
    mod1: 2,
    mod2: 14,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 192,
      x: 144,
    },
  },
];
const tier2LootTable = [
  {
    name: "Long Sword",
    class: "weapon",
    mod1: 1,
    mod2: 6,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 96,
      x: 0,
    },
  },
  {
    name: "Steel Shield",
    class: "shield",
    mod1: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 240,
      x: 288,
    },
  },
  {
    name: "Steel Helmet",
    class: "head",
    mod1: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 432,
      x: 384,
    },
  },
  {
    name: "Steel Armor",
    class: "torso",
    mod1: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 480,
      x: 384,
    },
  },
];
const tier1LootTable = [
  {
    name: "Dagger",
    class: "weapon",
    mod1: 0,
    mod2: 3,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 96,
      x: 96,
    },
  },
  {
    name: "Wooden Shield",
    class: "shield",
    mod1: 1,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 240,
      x: 0,
    },
  },
  {
    name: "Leather Helmet",
    class: "head",
    mod1: 1,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 432,
      x: 96,
    },
  },
  {
    name: "Leather Armor",
    class: "torso",
    mod1: 1,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 480,
      x: 96,
    },
  },
];

const chest = {
  spriteSheet: "itemAtlas",
  spriteSheetCoordinates: {
    y: 48,
    x: 336,
  },
};

const mimic = {
  name: "Mimic",
  flavortext: "The wood bends and cracks, shaping a ghastly mouth full of teeth",
  attack: 5,
  defense: 8,
  damage: 9,
  health: 17,
  spriteSheet: "heroAtlas",
  spriteSheetCoordinates: {
    y: 576,
    x: 336,
  },
}

class Spawner {
  constructor(world) {
    this.world = world;
    this.tier = world.tier;
  }
  spawn(spawnCount, createEntity) {
    for (let count = 0; count < spawnCount; count++) {
      let entity = createEntity();
      this.world.add(entity);
      this.world.moveToSpace(entity);
    }
  }

  spawnOne(entity) {
    this.world.add(entity);
    this.world.moveToSpace(entity);
  }

  spawnOneMimic(entity) {
    this.world.add(entity);
  }

  spawnLoot(number) {
    for (let i = 0; i < number; i++) {
      this.spawnOne(
        new Chest(
          getRandomInt(this.world.width - 1),
          getRandomInt(this.world.height - 1),
          this.world.tilesize,
          chest,
        )
      );
    }
  }

  spawnChestLootAt(x, y) {
    let currentLootTable = [];
    if (this.tier === 1) {
      currentLootTable = [...tier1LootTable];
    } else if (this.tier === 2) {
      currentLootTable = [...tier2LootTable];
    } else if (this.tier === 3) {
      currentLootTable = [...tier3LootTable];
    }

    let itemIndex = getRandomInt(currentLootTable.length);
    let qualityRoll = Math.random();
    let enchantmentRoll = Math.random();

    let spawnedItem = { ...currentLootTable[itemIndex] };

    let isEquipment =
      spawnedItem.class === "head" ||
      spawnedItem.class === "torso" ||
      spawnedItem.class === "weapon" ||
      spawnedItem.class === "shield";

    if(spawnedItem.name === "Ring of Domination") {
      isEquipment = false
    }

    if (qualityRoll < 0.1 && isEquipment) {
      //it is Pristine
      spawnedItem.name = `Pristine ${spawnedItem.name}`;
      spawnedItem.mod1 += 1;
    } else if (qualityRoll > 0.7 && qualityRoll < 0.9 && isEquipment) {
      //it's damaged
      spawnedItem.name = `Dingy ${spawnedItem.name}`;
      spawnedItem.mod1 = spawnedItem.mod1 === 1 ? 1 : spawnedItem.mod1 - 1;
    } else {
      //it's regular
    }

    if (enchantmentRoll > 0.9 && isEquipment) {
      spawnedItem.name = `Cursed ${spawnedItem.name}`;
      spawnedItem.mod1 *= 2;
      spawnedItem.status = "cursed";
    } else if (enchantmentRoll > 0.7 && isEquipment) {
      //it's spiky
      spawnedItem.name = `Spiky ${spawnedItem.name}`;
      spawnedItem.status = "spiky";
    } else if (enchantmentRoll > 0.5 && isEquipment) {
      //it's stealthy
      spawnedItem.name = `Stealthy ${spawnedItem.name}`;
      spawnedItem.status = "stealthy";
    } else if (enchantmentRoll > 0.3 && isEquipment) {
      //it's deadly
      spawnedItem.name = `Deadly ${spawnedItem.name}`;
      spawnedItem.status = "deadly";
    } else {
      //it's normal
    }

    let loot = new Loot(x, y, this.world.tilesize, spawnedItem);
    this.world.add(loot);
  }

  spawnMimicChest() {
    this.spawnOne(
      new Chest(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.tilesize,
        chest,
        true
      )
    );
  }

  spawnMimic(x, y) {

    if (this.tier === 2) {
      mimic.attack += 2
      mimic.damage += 6
      mimic.health += 20
    } else if (this.tier === 3) {
      mimic.attack += 4
      mimic.defense += 1
      mimic.damage += 16
      mimic.health += 40
    }

    this.spawnOneMimic(new Monster(
        x,
        y,
        this.world.tilesize,
        mimic
      )
    );
  }

  spawnMimicLoot(x, y) {
    let currentLootTable = [];
    if (this.tier === 1) {
      currentLootTable = [...tier1LootTable];
    } else if (this.tier === 2) {
      currentLootTable = [...tier2LootTable];
    } else if (this.tier === 3) {
      currentLootTable = [...tier3LootTable];
    }

    let itemIndex = getRandomInt(currentLootTable.length);
    let qualityRoll = Math.random();
    let enchantmentRoll = Math.random();

    let spawnedItem = { ...currentLootTable[itemIndex] };

    let isEquipment =
      spawnedItem.class === "head" ||
      spawnedItem.class === "torso" ||
      spawnedItem.class === "weapon" ||
      spawnedItem.class === "shield";

      if (qualityRoll < 0.2 && isEquipment) {
        //it is Pristine
        spawnedItem.name = `Pristine ${spawnedItem.name}`;
        spawnedItem.mod1 += 1;
      } else {
        //it's regular
      }
  
      if (enchantmentRoll > 0.9 && isEquipment) {
        spawnedItem.name = `Cursed ${spawnedItem.name}`;
        spawnedItem.mod1 *= 2;
        spawnedItem.status = "cursed";
      } else if (enchantmentRoll > 0.7 && isEquipment) {
        //it's spiky
        spawnedItem.name = `Spiky ${spawnedItem.name}`;
        spawnedItem.status = "spiky";
      } else if (enchantmentRoll > 0.5 && isEquipment) {
        //it's stealthy
        spawnedItem.name = `Stealthy ${spawnedItem.name}`;
        spawnedItem.status = "stealthy";
      } else if (enchantmentRoll > 0.3 && isEquipment) {
        //it's deadly
        spawnedItem.name = `Deadly ${spawnedItem.name}`;
        spawnedItem.status = "deadly";
      } else {
        //it's normal
      }

    let loot = new Loot(x, y, this.world.tilesize, spawnedItem);
    this.world.add(loot);
    this.world.moveDropToSpace(loot);
  }

  spawnLootAt(x, y) {
    let currentLootTable = [];
    if (this.tier === 1) {
      currentLootTable = [...globalLoot];
    } else if (this.tier === 2) {
      currentLootTable = [...tier1LootTable, ...globalLoot];
    } else if (this.tier === 3) {
      currentLootTable = [...tier2LootTable, ...globalLoot];
    } else if (this.tier === "boss") {
      currentLootTable = bossDrop;
    }

    let itemIndex = getRandomInt(currentLootTable.length);
    let qualityRoll = Math.random();
    let enchantmentRoll = Math.random();

    let spawnedItem = { ...currentLootTable[itemIndex] };

    let isEquipment =
      spawnedItem.class === "head" ||
      spawnedItem.class === "torso" ||
      spawnedItem.class === "weapon" ||
      spawnedItem.class === "shield";

      if(spawnedItem.name === "Ring of Domination") {
        isEquipment = false
      }

      if (qualityRoll < 0.1 && isEquipment) {
        //it is Pristine
        spawnedItem.name = `Pristine ${spawnedItem.name}`;
        spawnedItem.mod1 += 1;
      } else if (qualityRoll > 0.7 && qualityRoll < 0.9 && isEquipment) {
        //it's damaged
        spawnedItem.name = `Dingy ${spawnedItem.name}`;
        spawnedItem.mod1 = spawnedItem.mod1 === 1 ? 1 : spawnedItem.mod1 - 1;
      } else {
        //it's regular
      }
  
      if (enchantmentRoll > 0.9 && isEquipment) {
        spawnedItem.name = `Cursed ${spawnedItem.name}`;
        spawnedItem.mod1 *= 2;
        spawnedItem.status = "cursed";
      } else if (enchantmentRoll > 0.7 && isEquipment) {
        //it's spiky
        spawnedItem.name = `Spiky ${spawnedItem.name}`;
        spawnedItem.status = "spiky";
      } else if (enchantmentRoll > 0.5 && isEquipment) {
        //it's stealthy
        spawnedItem.name = `Stealthy ${spawnedItem.name}`;
        spawnedItem.status = "stealthy";
      } else if (enchantmentRoll > 0.3 && isEquipment) {
        //it's deadly
        spawnedItem.name = `Deadly ${spawnedItem.name}`;
        spawnedItem.status = "deadly";
      } else {
        //it's normal
      }

    let loot = new Loot(x, y, this.world.tilesize, spawnedItem);
    this.world.add(loot);
    this.world.moveDropToSpace(loot);
  }

  spawnMonsters(spawnCount) {
    console.log("spawning", this.tier);

    let currentMonsterTable = [];
    if (this.tier === 1) {
      currentMonsterTable = tier1MonsterTable;
    } else if (this.tier === 2) {
      currentMonsterTable = tier2MonsterTable;
    } else if (this.tier === 3) {
      currentMonsterTable = tier3MonsterTable;
    }

    this.spawn(spawnCount, () => {
      return new Monster(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.tilesize,
        currentMonsterTable[getRandomInt(currentMonsterTable.length)]
      );
    });
  }

  spawnStairs() {
    let stairs = new Stairs(
      this.world.width - 10,
      this.world.height - 10,
      this.world.tilesize
    );
    this.world.add(stairs);
    this.world.moveToSpace(stairs);
  }

  spawnBoss() {
    let boss = new Monster(
      this.world.width - this.world.width / 2,
      this.world.height - this.world.height / 2,
      this.world.tilesize,
      bossTable[getRandomInt(bossTable.length)]
    );
    this.world.add(boss);
    this.world.moveToSpace(boss);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;
