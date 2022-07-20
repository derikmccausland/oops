import Entity from "./Entity";
import ItemPickup from "./assets/sounds/itemPickup.mp3";
import ItemDrop from "./assets/sounds/dropItem.wav";

const itemPickup = new Audio(ItemPickup);
const itemDrop = new Audio(ItemDrop);

    // hexcodes
  const warning = "#D18C8C"
  const consumable = "#48FF47"
  const story = "#CACACA"
  const info = "#7F96FF"
  const inspect = "#00A5D8"
    // see HexContext.js for key

class Player extends Entity {
  inventory = [
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
  ];
  inspecting = [];
  left = [];
  right = [];
  head = [];
  torso = [];

  attributes = {
    // name: "Player",
    alive: true,
    didMove: false,
    didRest: false,
    attack: 0,
    defense: 14,
    damage: 3,
    block: 0,
    maxHealth: 50,
    health: 50,
    sightRadius: 7,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 48,
      x: 240,
    },
  };

  move(dx, dy) {
    if (this.attributes.health <= 0) return;
    this.x += dx;
    this.y += dy;
  }

  add(item) {
    if (this.inspecting.length === 1) {
      this.inspecting.splice(0, 1);
      this.inspecting.push({ item: item.attributes, pos: null, entity: item });
      itemPickup.play();
      return [`looks like a ${item.attributes.name}`, inspect];
    } else {
      this.inspecting.push({ item: item.attributes, pos: null, entity: item });
      itemPickup.play();
      return [`looks like a ${item.attributes.name}`, inspect];
    }
  }

  addN() {
    const [inspecting] = this.inspecting;
    if (inspecting?.pos === null && this.inventory.length < 6) {
      const added = [`added ${inspecting.item.name} to inventory`, info];
      this.inventory.push(inspecting.item);
      this.inspecting.splice(0, 1);
      // if (inspecting.item.name === "Ring of Domination") {
      //   this.attributes.spriteSheetCoordinates = { y: 48, x: 288 };
      // }
      return added;
    } else if (this.inventory.length >= 6) {
      return ["inventory full!", warning];
    } else if (!inspecting) {
      return ["pick up an item to inspect and add to your inventory", warning];
    } else {
      return ["this item is already in your possession!", warning];
    }
  }

  inspect(index) {
    const [inspecting] = this.inspecting;
    if (this.inventory[index]) {
      if (inspecting?.pos === index) {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({ pos: index, item: this.inventory[index] });
      } else {
        this.inspecting.push({ pos: index, item: this.inventory[index] });
      }
    } else {
      return ["add an item to your inventory first!", warning];
    }
  }

  inspectE(position) {
    const [inspecting] = this.inspecting;
    if (position === "left" && this.left.length === 1) {
      if (inspecting?.pos === "left") {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({ pos: position, item: this.left[0] });
      } else {
        this.inspecting.push({ pos: position, item: this.left[0] });
      }
    } else if (position === "right" && this.right.length === 1) {
      if (!this.right) return;
      if (inspecting?.pos === "right") {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({ pos: position, item: this.right[0] });
      } else {
        this.inspecting.push({ pos: position, item: this.right[0] });
      }
    } else if (position === "head" && this.head.length === 1) {
      if (!this.head) return;
      if (inspecting?.pos === "head") {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({ pos: position, item: this.head[0] });
      } else {
        this.inspecting.push({ pos: position, item: this.head[0] });
      }
    } else if (position === "torso" && this.torso.length === 1) {
      if (!this.torso) return;
      if (inspecting?.pos === "torso") {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({ pos: position, item: this.torso[0] });
      } else {
        this.inspecting.push({ pos: position, item: this.torso[0] });
      }
    } else {
      return ["equip an item to inspect this slot!", warning];
    }
  }

  uninspect() {
    this.inspecting.splice(0, 1);
  }

  equip() {
    const [inspecting] = this.inspecting;
    if (this.inspecting.length === 1) {
      const { item } = inspecting;
      const health = [`you drink the ${item.name} and gain ${item.mod1} health points`, consumable];
      const healthMax = [`you drink the ${item.name} and max out your health points!`, consumable];
      const equip = [`you equip the ${item.name}`, info];
      if (typeof inspecting?.pos === "string")
        return ["you already have this equipped!", warning];

      // WEAPONS
      if (item.class === "weapon" && this.left.length === 0) {
        this.attributes.attack += item.mod1;
        this.attributes.damage += item.mod2;
        if (item.mod3) this.attributes.sightRadius += item.mod3;
        if (inspecting.pos === null) {
          this.left.push(inspecting.item);
        } else {
          this.left.push(this.inventory[inspecting.pos]);
          this.inventory.splice(inspecting.pos, 1);
        }
        this.inspecting.splice(0, 1);
        return equip;
      } else if (item.class === "weapon" && this.right.length === 0) {
        this.attributes.attack += item.mod1;
        this.attributes.damage += item.mod2;
        if (item.mod3) this.attributes.sightRadius += item.mod3;
        if (inspecting.pos === null) {
          this.right.push(inspecting.item);
        } else {
          this.right.push(this.inventory[inspecting.pos]);
          this.inventory.splice(inspecting.pos, 1);
        }
        this.inspecting.splice(0, 1);
        return equip;

        // SHIELDS
      } else if (item.class === "shield" && this.left.length === 0) {
        this.attributes.block += item.mod1;
        if (inspecting.pos === null) {
          this.left.push(inspecting.item);
        } else {
          this.left.push(this.inventory[inspecting.pos]);
          this.inventory.splice(inspecting.pos, 1);
        }
        this.inspecting.splice(0, 1);
        return equip;
      } else if (item.class === "shield" && this.right.length === 0) {
        this.attributes.block += item.mod1;
        if (inspecting.pos === null) {
          this.right.push(inspecting.item);
        } else {
          this.right.push(this.inventory[inspecting.pos]);
          this.inventory.splice(inspecting.pos, 1);
        }
        this.inspecting.splice(0, 1);
        return equip;

        // HEAD
      } else if (item.class === "head" && this.head.length === 0) {
        this.attributes.defense += item.mod1;
        if (inspecting.pos === null) {
          this.head.push(inspecting.item);
        } else {
          this.head.push(this.inventory[inspecting.pos]);
          this.inventory.splice(inspecting.pos, 1);
        }
        this.inspecting.splice(0, 1);
        return equip;

        // TORSO
      } else if (item.class === "torso" && this.torso.length === 0) {
        this.attributes.defense += item.mod1;
        if (inspecting.pos === null) {
          this.torso.push(inspecting.item);
        } else {
          this.torso.push(this.inventory[inspecting.pos]);
          this.inventory.splice(inspecting.pos, 1);
        }
        this.inspecting.splice(0, 1);
        return equip;

        // CONSUMABLES
      } else if (item.class === "healthCon") {
        this.attributes.health += item.mod1;
        if (item.mod2) {
          this.attributes.maxHealth += item.mod2;
          console.log(item.mod2);
        }
        if (this.attributes.health > this.attributes.maxHealth) {
          this.attributes.health = this.attributes.maxHealth;
          if (inspecting.pos === null) {
            this.inspecting.splice(0, 1);
          } else {
            this.inventory.splice(inspecting.pos, 1);
            this.inspecting.splice(0, 1);
          }
          return healthMax;
        }
        if (inspecting.pos === null) {
          this.inspecting.splice(0, 1);
        } else {
          this.inventory.splice(inspecting.pos, 1);
          this.inspecting.splice(0, 1);
        }
        return health;
      } else {
        // this.inspecting.splice(0, 1);
        return ["you cannot equip this item!", warning];
      }
    } else {
      return ["inspect an item in your inventory to equip!", warning];
    }
  }

  unequip() {
    if (this.inspecting.length === 1) {
      const [inspecting] = this.inspecting;
      const { item } = inspecting;
      const unequip = [`you unequip the ${item.name}`, info];
      if (typeof inspecting?.pos === "string") {
        // WEAPONS
        if (item.class === "weapon" && this.inventory.length < 6) {
          this.attributes.attack -= item.mod1;
          this.attributes.damage -= item.mod2;
          if (item.mod3) this.attributes.sightRadius -= item.mod3;

          if (inspecting.pos === "left") {
            this.inventory.push(this.left[0]);
            this.left.splice(0, 1);
          } else if (inspecting.pos === "right") {
            this.inventory.push(this.right[0]);
            this.right.splice(0, 1);
          }

          this.inspecting.splice(0, 1);
          return unequip;

          // SHIELDS
        } else if (item.class === "shield" && this.inventory.length < 6) {
          this.attributes.block -= item.mod1;

          if (inspecting.pos === "left") {
            this.inventory.push(this.left[0]);
            this.left.splice(0, 1);
          } else if (inspecting.pos === "right") {
            this.inventory.push(this.right[0]);
            this.right.splice(0, 1);
          }

          this.inspecting.splice(0, 1);
          return unequip;

          // HEAD and TORSO
        } else if (this.inventory.length < 6) {
          this.attributes.defense -= item.mod1;

          if (inspecting.pos === "head") {
            this.inventory.push(this.head[0]);
            this.head.splice(0, 1);
          } else if (inspecting.pos === "torso") {
            this.inventory.push(this.torso[0]);
            this.torso.splice(0, 1);
          }

          this.inspecting.splice(0, 1);
          return unequip;
        } else {
          return ["drop an item before unequipping", warning];
        }
      } else {
        return ["inspect an equipped item to unequip!", warning];
      }
    } else {
      return ["inspect an equipped item to unequip!", warning];
    }
  }

  cast() {
    const [inspecting] = this.inspecting;
    this.inventory.splice(inspecting.pos, 1);
    this.inspecting.splice(0, 1);
    return ["the tome vanishes in a poof of smoke", story];
  }

  drop() {
    const [inspecting] = this.inspecting;
    if (!inspecting) return ["inspect and item first!", warning];
    if (inspecting.item.name === "Ring of Domination") {
      return ["the ring cannot be destroyed by any craft that you possess...", story]
    }
    const { item } = inspecting;
    if (typeof inspecting?.pos === "string") {
      if (item.class === "weapon") {
        this.attributes.attack -= item.mod1;
        this.attributes.damage -= item.mod2;
        if (item.mod3) this.attributes.sightRadius -= item.mod3;
      } else if (item.class === "shield") {
        this.attributes.block -= item.mod1;
      } else if (item.class === "head" || item.class === "torso") {
        this.attributes.defense -= item.mod1;
      }
      const drop = [`the ${inspecting.item.name} crumbles into dust...`, story];
      itemDrop.play();
      this[inspecting?.pos].splice(inspecting.pos, 1);
      this.inspecting.splice(0, 1);
      return drop;
    } else if (inspecting?.pos === null) {
      const drop = [`the ${inspecting.item.name} crumbles into dust...`, story];
      itemDrop.play();
      this.inspecting.splice(0, 1);
      return drop;
    }
    const drop = [`the ${inspecting.item.name} crumbles into dust...`, story];
    itemDrop.play();
    this.inventory.splice(inspecting.pos, 1);
    this.inspecting.splice(0, 1);
    return drop;
  }

  copyPlayer() {
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}

export default Player;
