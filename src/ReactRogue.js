import React, { useRef, useEffect, useState } from "react";
import MonsterDisplay from "./MonsterDisplay";
import InventorySprite from "./InventorySprite";
import InspectSprite from "./InspectSprite";
import InputManager from "./InputManager";
import Player from "./Player";
import Spawner from "./Spawner";
import World from "./World";
import Fireball from "./Fireball";
import Hadouken from "./assets/sounds/hadouken.mp3";
import ItemPickup from "./assets/sounds/itemPickup.mp3";
import EvilLaugh from "./assets/sounds/evilLaugh.mp3";
import CrySound from './assets/sounds/crySound.mp3'
import LP from "./cssSheets/LP.css";
import hints from "./Hints";

import EquippedItems from "./EquippedItems";

const hadoukenAudio = new Audio(Hadouken);
hadoukenAudio.volume = 0.25;
const itemPickup = new Audio(ItemPickup);
const evilLaugh = new Audio(EvilLaugh);
const crySound = new Audio(CrySound)

const ReactRogue = ({ width, height, tilesize, atlases }) => {
  const canvasRef = React.useRef(null);

  const [alive, setAlive] = useState(true);
  const [credits, setCredits] = useState(false);
  const [crying, setCrying] = useState(false);
  const [hintNum, setHintNum] = useState(undefined);
  const [winScreen, setWinScreen] = useState(false);

  const displayCredits = () => {
    setCredits(!credits);
  };

  const startCrying = () => {
    setCrying(!crying);
    crySound.play()
  };

  const stopCrying = () => {
    setCrying(!crying);
    crySound.pause()
  };

  const randomHint = () => {
    setHintNum(Math.floor(Math.random() * Math.floor(12)));
  };

  const [world, setWorld] = useState(
    new World(width, height, tilesize, atlases, 1)
  );

  const [inspecting] = world.player.inspecting;
  const currentHealth = world.player.attributes.health;
  const maxHealth = world.player.attributes.maxHealth;
  const healthBar = (currentHealth / maxHealth) * 100;

  let inputManager = new InputManager();
  const handleInput = (action, data) => {
    let newWorld = new World();
    Object.assign(newWorld, world);

    if (alive === false) {
      return;
    }

    if (action === "move") {
      if (inspecting?.item.class === "tome" && inspecting?.pos !== null) {
        hadoukenAudio.play();
        let fireDirection = "up";

        if (data.y < 0 && data.x === 0) {
          fireDirection = "up";
        } else if (data.y > 0 && data.x === 0) {
          fireDirection = "down";
        } else if (data.y === 0 && data.x > 0) {
          fireDirection = "right";
        } else if (data.y === 0 && data.x < 0) {
          fireDirection = "left";
        }

        newWorld.add(
          new Fireball(world.player.x, world.player.y, tilesize, fireDirection)
        );

        newWorld.castSpell();
      } else {
        newWorld.movePlayer(data.x, data.y);
      }
    } else if (action === "inspect") {
      newWorld.inspectItem(data);
    } else if (action === "addN") {
      newWorld.addNew();
    } else if (action === "equip") {
      newWorld.equipItem();

      if (
        newWorld.player.left[0]?.name !== "Ring of Domination" ||
        newWorld.player.right[0]?.name !== "Ring of Domination"
      ) {
        itemPickup.play();
      }

      if (
        newWorld.player.left[0]?.name === "Ring of Domination" ||
        newWorld.player.right[0]?.name === "Ring of Domination"
      ) {
        newWorld.player.attributes.spriteSheetCoordinates = { y: 48, x: 288 };
        setTimeout(() => {
          evilLaugh.play();
        }, 1500);
        setTimeout(() => {
          setWinScreen(true);
        }, 8500);
        // newWorld.showWin()
        // evilLaugh.play()
      }
    } else if (action === "inspectE") {
      newWorld.inspectEquip(data);
    } else if (action === "uninspect") {
      newWorld.uninspect();
    } else if (action === "unequip") {
      newWorld.unequipItem();
      itemPickup.play();
    } else if (action === "drop") {
      newWorld.dropItem();
      itemPickup.play();
    } else if (action === "rest") {
      newWorld.rest();
    }

    if (
      action === "inspect" ||
      action === "inspectE" ||
      action === "uninspect"
    ) {
      setWorld(newWorld);
    } else {
      newWorld.moveProjectiles();
      newWorld.moveMonsters();
      setWorld(newWorld);
    }
  };

  useEffect(() => {
    if (world.player.attributes.alive === false) {
      setAlive(false);
    }
    randomHint(12);
  }, [world, setAlive]);

  useEffect(() => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot(6);
    spawner.spawnMimicChest();
    spawner.spawnMonsters(100);
    spawner.spawnStairs();
    setWorld(newWorld);
  }, []);

  useEffect(() => {
    if (world.showWinScreen === true) {
      setWinScreen(true);
    }
  }, [world.showWinScreen]);

  useEffect(() => {
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    };
  });

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, width * tilesize, height * tilesize);
    world.draw(ctx);
    world.drawTopLayer(ctx);
  });

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div
      style={{
        background:
          "url(https://i.pinimg.com/originals/06/c3/95/06c3954b72ae8cfe586ec151efeb29cc.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "99vw",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          height: "1.5vh",
          width: "98vw",
          alignItems: "center",
        }}
      ></header>

      {!alive && (
        <div className="deathScreen">
          {!credits && !crying && <p className="deathText">YA DEAD, KID</p>}
          {!credits && !crying && (
            <p className="deathHint">Hint: {hints[hintNum]}</p>
          )}
          {!credits && !crying && (
            <div className="deathButtons">
              <div className="deathButton" onClick={() => refreshPage()}>
                ~Restart~
              </div>
              <div className="deathButton" onClick={() => displayCredits()}>
                ~View Credits~
              </div>
              <div className="deathButton" onClick={() => startCrying()}>
                ~Cry~
              </div>
            </div>
          )}

          {credits && (
            <div>
              Program Developers
              <br></br>
              Kyle Baugh ~ Alex Stapp ~ Steven Clark ~ Trevor Martin
              <br></br>
              <br></br>
              Sprites/Tileset
              <br></br>
              (C)2018 ORYX DESIGN LAB
              <br></br>
              <br></br>
              Audio
              <br></br>
              Sound Library ~ Hollywood Edge - Topic ~ Copopaxi TV ~ Makai
              Symphony ~ Fesliyan Studios
              <br></br> 
              <br></br>
              Visuals
              <br></br>
              Depoulaite ~ Mixkit.co ~ Gaming and God
              <br></br>
              <br></br>
              <br></br>
              <div className="creditsButton" onClick={() => displayCredits()}>
                ~Go Back~
              </div>
            </div>
          )}

          {crying && (
            <div>
              <img
                src="https://i.pinimg.com/originals/b2/79/66/b27966140db68d0621628f2309f8a443.gif"
                alt="Sad Spidey Gif"
              />

              <div className="cryButton" onClick={() => stopCrying()}>
                ~Back~
              </div>
            </div>
          )}
        </div>
      )}

      {winScreen && (
        <div className="winScreen">
          {!credits && (
            <div className="winText">
              A booming voice echoes in your head.
              <br></br>
              <br></br>
              THANK YOU FOR RELEASING ME FROM THIS WRETCHED STATE
              <br></br>
              <br></br>I HAVE BEEN IMPRISONED HERE FOR CENTURIES, AWAITING THE
              ONE WHO WAS AS SELFISH AND AS BLOODTHIRSTY AS I<br></br>
              <br></br>
              YOU MUST NOW SUFFER THE SAME FATE
              <br></br>
              <br></br>
              PRAY THAT SOME UNFORTUNATE SOUL FOLLOWS IN YOUR FOOTSTEPS
              <br></br>
              <br></br>
              UNTIL SUCH TIME, ENJOY YOUR...
            </div>
          )}

          {!credits && <div className="winEnd">HYPOGEAN DOMINION</div>}

          {!credits && (
            <div>
              <div className="deathButtons">
                <div className="deathButton" onClick={() => refreshPage()}>
                  ~Restart~
                </div>
                <div className="deathButton" onClick={() => displayCredits()}>
                  ~View Credits~
                </div>
              </div>
            </div>
          )}

          {credits && (
            <div>
              Program Developers
              <br></br>
              Kyle Baugh ~ Alex Stapp ~ Steven Clark ~ Trevor Martin
              <br></br>
              <br></br>
              Sprites/Tileset
              <br></br>
              (C)2018 ORYX DESIGN LAB
              <br></br>
              <br></br>
              Audio
              <br></br>
              Sound Library ~ Hollywood Edge - Topic ~ Copopaxi TV ~ Kyle Baugh
              <br></br>
              <br></br>
              Visuals
              <br></br>
              Depoulaite ~ Mixkit.co ~ Gaming and God
              <br></br>
              <br></br>
              <br></br>
              <div className="creditsButton" onClick={() => displayCredits()}>
                ~Go Back~
              </div>
            </div>
          )}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div
          className="leftOfCanvas"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "20vw",
            minHeight: "100vh",
          }}
        >
          <div
            className="newPlayer"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "15%",
              width: "95%",
              justifyContent: "center",
              alignItems: "center",
              borderStyle: "solid",
              borderColor: "black",
              marginTop: "1vw",
              backgroundColor: "rgba(211, 211, 211, 0.598)",
            }}
          >
            <h3>Player Stats</h3>
            <section
              style={{
                display: "flex",
                height: "2.5vh",
                width: "32.5%",
                borderStyle: "solid",
                borderColor: "black",
                marginTop: "-1vh",
                marginBottom: "1vh",
                backgroundColor: "red",
                zIndex: 1,
              }}
            >
              <section
                style={{
                  height: "100%",
                  width: `${healthBar}%`,
                  backgroundColor: "green",
                  zIndex: 2,
                  textAlign: "center",
                  color: "white",
                }}
              >
                <section
                  style={{
                    minWidth: "6.25vw",
                    textAlign: "center",
                  }}
                >
                  HP: {world.player.attributes.health} /{" "}
                  {world.player.attributes.maxHealth}
                </section>
              </section>
            </section>

            <div
              style={{
                display: "flex",
                width: "35%",
                justifyContent: "space-between",
              }}
            >
              <div>
                Hit:
                <br></br>
                Defense:
                <br></br>
                Damage:
                <br></br>
                Block:
                <br></br>
                Visibility:
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                }}
              >
                {world.player.attributes.attack}
                <br></br>
                {world.player.attributes.defense}
                <br></br>
                {world.player.attributes.damage}
                <br></br>
                {world.player.attributes.block}
                <br></br>
                {world.player.attributes.sightRadius}
                <br></br>
                <br></br>
              </div>
            </div>
          </div>

          <div
            className="equippedItems"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "15%",
              width: "95%",
              justifyContent: "center",
              alignItems: "center",
              borderStyle: "solid",
              borderColor: "black",
              marginTop: "1vw",
              marginBottom: "1vw",
              backgroundColor: "rgba(211, 211, 211, 0.598)",
            }}
          >
            <h3>Equipped Items</h3>

            <div className="equippedItemsSection">
              <div>
                <EquippedItems world={world} atlases={atlases} />
              </div>

              <div
                style={{
                  width: "60%",
                  flexWrap: "wrap",
                }}
              >
                {world.player.left.map((item, index) => (
                  <p key={index} style={{ margin: 0 }}>
                    7.{" "}
                    {item.charges ? `${item.name} ${item.charges}` : item.name}
                  </p>
                ))}
                {world.player.right.map((item, index) => (
                  <p key={index} style={{ margin: 0 }}>
                    8.{" "}
                    {item.charges ? `${item.name} ${item.charges}` : item.name}
                  </p>
                ))}
                {world.player.head.map((item, index) => (
                  <p key={index} style={{ margin: 0 }}>
                    9.{" "}
                    {item.charges ? `${item.name} ${item.charges}` : item.name}
                  </p>
                ))}
                {world.player.torso.map((item, index) => (
                  <p key={index} style={{ margin: 0 }}>
                    0.{" "}
                    {item.charges ? `${item.name} ${item.charges}` : item.name}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {world.player.inspecting.length === 1 && (
            <div
              className="readiedItem"
              style={{
                display: "flex",
                justifyContent: "center",
                minHeight: "15%",
                width: "95%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "10px 0 10px 0",
                borderStyle: "solid",
                borderColor: "black",
                marginBottom: "1vw",
                backgroundColor: "rgba(211, 211, 211, 0.598)",
              }}
            >
              <div
                style={{
                  width: "95%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor:'orange'
                }}
              >
                {inspecting.pos === null ? (
                  <>
                    {/* <h3>{inspecting.item.name} Readied!</h3> */}
                    <h4 style={{ marginTop: "10px" }}>
                      Upon inspecting the {inspecting.item.name} you find...
                    </h4>
                    <div className="inspectSection">
                      <InspectSprite
                        atlas={atlases.itemAtlas}
                        item={inspecting.item}
                      />
                      {inspecting.item.class === "weapon" &&
                      inspecting.item.name !== "Ring of Domination" ? (
                        <div>
                          <p>
                            Hit +{inspecting.item.mod1}
                            <br></br>
                            Damage +{inspecting.item.mod2}
                          </p>
                          {/* <p>
                          Boop
                          </p> */}
                        </div>
                      ) : inspecting.item.class === "shield" ? (
                        <p>Block +{inspecting.item.mod1}</p>
                      ) : inspecting.item.class === "head" ||
                        inspecting.item.class === "torso" ? (
                        <p>Defense +{inspecting.item.mod1}</p>
                      ) : inspecting.item.class === "healthCon" &&
                        inspecting.item.mod2 ? (
                        <div>
                          <p>
                            Health +{inspecting.item.mod1}
                            <br></br>
                            Max Health +{inspecting.item.mod2}
                          </p>
                        </div>
                      ) : inspecting.item.class === "healthCon" ? (
                        <p>Health +{inspecting.item.mod1}</p>
                      ) : inspecting.item.class === "shieldCon" ? (
                        <p>Block +{inspecting.item.mod1}</p>
                      ) : inspecting.item.name === "Ring of Domination" ? (
                        <div>
                          {/* <p>
                            Hit +{inspecting.item.mod1}
                            <br></br>
                            Damage +{inspecting.item.mod2}
                          </p> */}
                          <p>
                            A strange power emanates from the mystical Ring.
                            <br></br>I wonder what will happen if you put it
                            on...
                          </p>
                        </div>
                      ) : inspecting.item.class === 'tome' ? (
                        <p>A dusty old tome, with writing in some ancient language</p>
                      ) : (
                        <div>
                          What did you do?? You broke it!! Refresh your screen.
                        </div>
                      )}
                    </div>
                    {inspecting.item.name === "Tome of Fireball" ? (
                      <p
                        style={{
                          marginTop: "0%",
                          marginBottom: "0%",
                        }}
                      >
                        Add: "T", Destroy: "G"
                      </p>
                    ) : inspecting.item.class === "healthCon" ? (
                      <p
                        style={{
                          marginTop: "0%",
                          marginBottom: "0%",
                        }}
                      >
                        Add: "T", Use: "E", Destroy: "G"
                      </p>
                    ) : (
                      <p
                        style={{
                          marginTop: "0%",
                          marginBottom: "0%",
                        }}
                      >
                        Add: "T", Use: "E", Destroy: "G"
                      </p>
                    )}
                  </>
                ) : (
                  <div
                    style={{
                      width: "95%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      // backgroundColor:'orange'
                    }}
                  >
                    <h4 style={{ marginTop: "10px" }}>
                      Upon inspecting the {inspecting.item.name} you find...
                    </h4>

                    <div className="inspectSection">
                      <InspectSprite
                        atlas={atlases.itemAtlas}
                        item={inspecting.item}
                      />

                      {inspecting.item.class === "weapon" &&
                      inspecting.item.name !== "Ring of Domination" ? (
                        <div>
                          <p>
                            Hit +{inspecting.item.mod1}
                            <br></br>
                            Damage +{inspecting.item.mod2}
                          </p>
                        </div>
                      ) : inspecting.item.class === "shield" ? (
                        <p>Block +{inspecting.item.mod1}</p>
                      ) : inspecting.item.class === "head" ||
                        inspecting.item.class === "torso" ? (
                        <p>Defense +{inspecting.item.mod1}</p>
                      ) : inspecting.item.class === "healthCon" &&
                        inspecting.item.mod2 ? (
                        <div>
                          <p>
                            Health +{inspecting.item.mod1}
                            <br></br>
                            Max Health +{inspecting.item.mod2}
                          </p>
                        </div>
                      ) : inspecting.item.class === "healthCon" ? (
                        <p>Health +{inspecting.item.mod1}</p>
                      ) : inspecting.item.class === "shieldCon" ? (
                        <p>Block +{inspecting.item.mod1}</p>
                      ) : inspecting.item.name === "Ring of Domination" ? (
                        <div>
                          <p>
                            Hit +{inspecting.item.mod1}
                            <br></br>
                            Damage +{inspecting.item.mod2}
                          </p>
                          <p>
                            A strange power eminates from the Ring. I wonder
                            what would happen if you put it on...
                          </p>
                        </div>
                      ) : inspecting.item.class === 'tome' ? (
                        <p>A dusty old tome, with writing in some ancient language</p>
                      ) : (
                        <div>
                          What did you do?? You broke it!! Refresh your screen.
                        </div>
                      )}
                    </div>

                    {typeof inspecting.pos === "string" ? (
                      <p
                        style={{
                          marginTop: "0%",
                          marginBottom: "0%",
                        }}
                      >
                        Unequip: "Q", Destroy: "G"
                      </p>
                    ) : inspecting.item.name === "Tome of Fireball" ? (
                      <p>Fire: Press any direction, Destroy: "G"</p>
                    ) : inspecting.item.class === "healthCon" ? (
                      <p
                        style={{
                          marginTop: "0%",
                          marginBottom: "0%",
                        }}
                      >
                        Equip: "E", Destroy: "G"
                      </p>
                    ) : (
                      <p
                        style={{
                          marginTop: "0%",
                          marginBottom: "0%",
                        }}
                      >
                        Equip: "E", Destroy: "G"
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <div
            className="fullInventory"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "15%",
              width: "95%",
              justifyContent: "center",
              alignItems: "center",
              borderStyle: "solid",
              borderColor: "black",
              backgroundColor: "rgba(211, 211, 211, 0.598)",
            }}
          >
            <h3
              style={{
                marginBottom: "-2.5%",
              }}
            >
              Inventory
            </h3>
            <ol type="1">
              {world.player.inventory.map((item, index) => (
                <li key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      // backgroundColor:'pink',
                    }}
                  >
                    <div>{item.name}</div>
                    <div>
                      <InventorySprite atlas={atlases.itemAtlas} item={item} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <p
              style={{
                marginTop: "-3.5%",
                // backgroundColor:'green'
              }}
            >
              Press Number Key to Ready an Item!
            </p>
          </div>

          <div className="muteOptions"></div>
        </div>
        <div
          className="canvasSection"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <canvas
            ref={canvasRef}
            width={width * tilesize * 1}
            height={height * tilesize * 1}
            maxWidth={"75vw"}
            style={{
              marginTop: "2vh",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "white",
            }}
          ></canvas>
        </div>

        <div
          className="rightSide"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "20vw",
            height: "100vh",
            // borderStyle: "solid",
            // borderColor: "black",
          }}
        >
          <div
            className="eventHistory"
            style={{
              height: "40%",
              width: "95%",
              borderStyle: "solid",
              borderColor: "black",
              marginTop: "1vw",
              backgroundColor: "rgba(54, 54, 54, 0.598)",
            }}
          >
            <h2
              className="eventHeader"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Event History
            </h2>
            <ul>
              {world.history.map((item, index) => (
                <li key={index} style={{color: `${item.hex}`}}>{item.body}</li>
              ))}
            </ul>
          </div>

          <div className="monster-box">
            <MonsterDisplay world={world} setWorld={setWorld} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactRogue;
