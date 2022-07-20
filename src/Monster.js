import Entity from "./Entity";
import Blood from "./Blood";
import Player from "./Player";
import Spawner from "./Spawner";
import Dagger from "./assets/sounds/dagger.mp3";
import HumanDeath from "./assets/sounds/humanPain.wav";
// import MetalHit from './assets/sounds/metalHit.wav'
import Gore from "./assets/sounds/gore.wav";
import Wiff from "./assets/sounds/wiff.mp3";
import Shield from "./assets/sounds/shield.mp3";
import BossDeath from "./assets/sounds/bossDeath.wav";
import CursedWeapon from './assets/sounds/cursedBreak.mp3'

const daggerAudio = new Audio(Dagger);
daggerAudio.volume = 0.5;
const humanDeathAudio = new Audio(HumanDeath);
const gore = new Audio(Gore);
gore.volume = 0.5;
const wiff = new Audio(Wiff);
wiff.volume = 0.5;
const shield = new Audio(Shield);
const bossDeath = new Audio(BossDeath);
const cursedWeapon = new Audio(CursedWeapon)

const info = "#7F96FF"
const monsterDeath = "#00D966"
const monsterAttack = "#FF917C"
const playerAttack = "#F6BF00"
const critical = "#F6D900"
const curse = "#CF0000"

const blood = {
  spriteSheet: "terrainAtlas",
  spriteSheetCoordinates: {
    x: 288,
    y: 1680,
  },
};

const tombstone = {
  spriteSheet: "terrainAtlas",
  spriteSheetCoordinates: {
    x: 288,
    y: 1488,
  },
};

function combatRoll(max) {
  return Math.floor(Math.random() * max);
}

class Monster extends Entity {
  action(verb, world) {
    const [left] = world.player.left;
    const [right] = world.player.right;
    const [head] = world.player.head;
    const [torso] = world.player.torso;

    if (verb === "fireball") {
      if (world.tier === "boss") {
        world.addToHistory(
          [`${this.attributes.name.toUpperCase()} IMMUNE TO YOUR PATHETIC FIREBALL!`, monsterAttack]
        );
      } else {
        world.addToHistory(
          [`${this.attributes.name.toUpperCase()} IS OBLITERATED!`, monsterDeath]
        );
        world.add(new Blood(this.x, this.y, this.tilesize, blood));

        let dropRoll = Math.random();
        if (this.attributes.name === "Mimic") {
          world.addToHistory([`${this.attributes.name} drops an item!`, info]);
          let spawner = new Spawner(world);
          spawner.spawnMimicLoot(this.x, this.y);
        } else if (dropRoll < 0.99 || world.tier === "boss") {
          world.addToHistory([`${this.attributes.name} drops an item!`, info]);
          let spawner = new Spawner(world);
          spawner.spawnLootAt(this.x, this.y);
        }

        world.remove(this);
      }
    }

    if (verb === "bump") {
      let playerAttackRoll = combatRoll(20);
      let pAttackMod = 0 + playerAttackRoll + world.player.attributes.attack;

      // curse
      if (left?.status === "cursed") {
        let curseRoll = Math.random();
        if (curseRoll < 0.01) {
          world.player.attributes.health -= left.mod1 * 4;
          world.addToHistory(
            [`your ${left.name} BURSTS INTO FLAME and you take ${
              left.mod1 * 4
            } damage`, curse]
            );
          cursedWeapon.play()
          if (world.player.inspecting[0]?.pos === "left") {
            world.player.inspecting.splice(0, 1);
          }
          if (left.class === "shield") {
            world.player.attributes.block -= left.mod1;
          } else {
            world.player.attributes.attack -= left.mod1;
            world.player.attributes.damage -= left.mod2;
          }
          world.player.left.splice(0, 1);
          return;
        }
      }
      if (right?.status === "cursed") {
        let curseRoll = Math.random();
        if (curseRoll < 0.01) {
          world.player.attributes.health -= right.mod1 * 4;
          world.addToHistory(
            [`your ${right.name} BURSTS INTO FLAME and you take ${
              right.mod1 * 4
            } damage`, curse]
          );
          cursedWeapon.play()
          if (world.player.inspecting[0]?.pos === "right") {
            world.player.inspecting.splice(0, 1);
          }
          if (right.class === "shield") {
            world.player.attributes.block -= right.mod1;
          } else {
            world.player.attributes.attack -= right.mod1;
            world.player.attributes.damage -= right.mod2;
          }
          world.player.right.splice(0, 1);
          return;
        }
      }
      if (head?.status === "cursed") {
        let curseRoll = Math.random();
        if (curseRoll < 0.01) {
          world.player.attributes.health -= head.mod1 * 4;
          world.addToHistory(
            [`your ${head.name} BURSTS INTO FLAME and you take ${
              head.mod1 * 4
            } damage`, curse]
          );
          cursedWeapon.play()
          if (world.player.inspecting[0]?.pos === "head") {
            world.player.inspecting.splice(0, 1);
          }
          world.player.attributes.defense -= head.mod1;
          world.player.head.splice(0, 1);
          return;
        }
      }
      if (torso?.status === "cursed") {
        let curseRoll = Math.random();
        if (curseRoll < 0.01) {
          world.player.attributes.health -= torso.mod1 * 4;
          world.addToHistory(
            [`your ${torso.name} BURSTS INTO FLAME and you take ${
              torso.mod1 * 4
            } damage`, curse]
          );
          cursedWeapon.play()
          if (world.player.inspecting[0]?.pos === "torso") {
            world.player.inspecting.splice(0, 1);
          }
          world.player.attributes.defense -= torso.mod1;
          world.player.torso.splice(0, 1);
          return;
        }
      }

      // end of curse
      if (world.player.attributes.didRest) {
        let restBonus = 3;
        pAttackMod += restBonus;
        world.addToHistory(
          ["Your preparation gives you an additional chance to hit.", playerAttack]
        );
      }

      if (+pAttackMod >= this.attributes.defense) {
        let deadyBonus = 0;
        if (world.player.left[0]?.status === "deadly") deadyBonus += 1;
        if (world.player.right[0]?.status === "deadly") deadyBonus += 1;
        if (world.player.head[0]?.status === "deadly") deadyBonus += 1;
        if (world.player.torso[0]?.status === "deadly") deadyBonus += 1;

        let totalBonus = parseInt(playerAttackRoll) + parseInt(deadyBonus);

        let stealthBonus = 0;
        if (world.player.left[0]?.status === "stealthy") stealthBonus += 2;
        if (world.player.right[0]?.status === "stealthy") stealthBonus += 2;
        if (world.player.head[0]?.status === "stealthy") stealthBonus += 2;
        if (world.player.torso[0]?.status === "stealthy") stealthBonus += 2;

        if (totalBonus >= 20) {
          world.addToHistory(
            [`PLAYER CRITICAL HITS FOR ${
              world.player.attributes.damage * 2
            } DAMAGE!`, critical]
          );
          daggerAudio.play();

          if (world.player.attributes.didMove && stealthBonus) {
            world.addToHistory(
              ["Your attack surprises the enemy and deals some additional damage.", playerAttack]
            );
            let tempDamage = world.player.attributes.damage + stealthBonus;
            this.attributes.health = this.attributes.health - tempDamage * 2;
          } else {
            this.attributes.health =
              this.attributes.health - world.player.attributes.damage * 2;
          }
        } else {
          world.addToHistory(
            [`Player attacks for ${world.player.attributes.damage} damage`, playerAttack]
          );
          daggerAudio.play();
          if (world.player.attributes.didMove && stealthBonus) {
            world.addToHistory(
              ["Your attack surprises the enemy and deals some additional damage.", playerAttack]
            );
            let tempDamage = world.player.attributes.damage + stealthBonus;
            this.attributes.health = this.attributes.health - tempDamage;
          } else {
            this.attributes.health =
              this.attributes.health - world.player.attributes.damage;
          }
        }

        if (this.attributes.health <= 0) {
          this.attributes.health = 0
          world.addToHistory([`${this.attributes.name} dies!`, monsterDeath]);
          world.removeHit();
          world.add(new Blood(this.x, this.y, this.tilesize, blood));
          gore.play();
          let dropRoll = Math.random();
          if (this.attributes.name === "Mimic") {
            world.addToHistory([`${this.attributes.name} drops an item!`, info]);
            let spawner = new Spawner(world);
            spawner.spawnLootAt(this.x, this.y);
          } else if (dropRoll < 0.2 || world.tier === "boss") {
            world.addToHistory([`${this.attributes.name} drops an item!`, info]);
            let spawner = new Spawner(world);
            if (world.tier === "boss") {
              world.pauseMusic();
              bossDeath.play();
            }
            spawner.spawnLootAt(this.x, this.y);
          }

          world.remove(this);
          return;
        } else {
          world.addToHistory(
            [`${this.attributes.name} has ${this.attributes.health} health remaining!`, info]
          );
        }
      } else {
        wiff.play();
        world.addToHistory(["Your attack missed!", info]);
      }
    }
    if (verb === "monsterBump") {
      let spikeBonus = 0;
      if (world.player.left[0]?.status === "spiky") spikeBonus += 1;
      if (world.player.right[0]?.status === "spiky") spikeBonus += 1;
      if (world.player.head[0]?.status === "spiky") spikeBonus += 1;
      if (world.player.torso[0]?.status === "spiky") spikeBonus += 1;

      if (spikeBonus > 0) {
        this.attributes.health -= spikeBonus;
        world.addToHistory(
          [`${this.attributes.name} was poked by spikes and has ${this.attributes.health} health remaining!`, info]
        );
      }

      if (this.attributes.health <= 0) {
        world.addToHistory(
          [`${this.attributes.name} was poked by spikes and dies!`, monsterDeath]
        );
        world.removeHit();
        world.add(new Blood(this.x, this.y, this.tilesize, blood));
        gore.play();
        let dropRoll = Math.random();
        if (this.attributes.name === "Mimic") {
          world.addToHistory([`${this.attributes.name} drops an item!`, info]);
          let spawner = new Spawner(world);
          spawner.spawnLootAt(this.x, this.y);
        } else if (dropRoll < 0.2 || world.tier === "boss") {
          world.addToHistory([`${this.attributes.name} drops an item!`, info]);
          let spawner = new Spawner(world);
          spawner.spawnLootAt(this.x, this.y);
        }

        world.remove(this);
        return;
      } else {
        //they didn't die from spikes so they can attack

        let monsterAttackRoll = combatRoll(20);
        let mAttackMod = 0 + monsterAttackRoll + this.attributes.attack;

        world.addToHistory([`${this.attributes.name} attacks Player!`, monsterAttack]);

        let moveBonus = 0;
        if (world.player.attributes.didMove) {
          moveBonus = 3;
          world.addToHistory(
            ["Your movement makes it harder for the enemy to hit you.", info]
          );
        }

        if (+mAttackMod >= world.player.attributes.defense + moveBonus) {
          if (monsterAttackRoll === 20) {
            world.addToHistory(
              [`${this.attributes.name}  CRITICAL HITS FOR ${
                this.attributes.damage * 2
              } DAMAGE!`, critical]
            );
            let unblocked =
              this.attributes.damage - world.player.attributes.block < 0
                ? 0
                : this.attributes.damage * 2 - world.player.attributes.block;

            world.player.attributes.health -= unblocked;
          } else {
            world.addToHistory(
              [`${this.attributes.name} attacks for ${this.attributes.damage} damage!`, monsterAttack]
            );
            let unblocked =
              this.attributes.damage - world.player.attributes.block < 0
                ? 0
                : this.attributes.damage - world.player.attributes.block;

            world.player.attributes.health -= unblocked;

            unblocked > 0
              ? world.addToHistory(
                  [`You were able to block ${
                    this.attributes.damage - unblocked
                  } damage.`, info]
                )
              : world.addToHistory(
                  [`you blocked their attack completely!`, info]
                );
          }

          if (world.player.attributes.health <= 0) {
            world.player.attributes.health = 0
            world.addToHistory(["You have died", curse]);
            world.entities[0].attributes.spriteSheetCoordinates =
              tombstone.spriteSheetCoordinates;
            world.entities[0].attributes.spriteSheet = tombstone.spriteSheet;
            world.player.attributes.alive = false;
            humanDeathAudio.play();
          } else {
            world.addToHistory(
              [`You have ${world.player.attributes.health} health remaining!`, info]
            );
          }
        } else {
          world.addToHistory([`${this.attributes.name}'s attack missed!`, info]);
        }
      }
    }
  }
}

export default Monster;
