import React, { useRef, useEffect, useState } from "react";
import "./styles.css";
import Demon1 from "./assets/uf_heroes/demon_red_1.png";
import Demon2 from "./assets/uf_heroes/demon_red_2.png";
import Demon3 from "./assets/uf_heroes/demon_red_3.png";

import Dragon1 from "./assets/uf_heroes/dragon_red_1.png";
import Dragon2 from "./assets/uf_heroes/dragon_red_2.png";
import Dragon3 from "./assets/uf_heroes/dragon_red_3.png";

import Golem1 from "./assets/uf_heroes/golem_fire_1.png";
import Golem2 from "./assets/uf_heroes/golem_fire_2.png";
import Golem3 from "./assets/uf_heroes/golem_fire_3.png";

import Banshee1 from "./assets/uf_heroes/banshee_1.png";
import Banshee2 from "./assets/uf_heroes/banshee_2.png";
import Banshee3 from "./assets/uf_heroes/banshee_3.png";

import Ogre1 from "./assets/uf_heroes/ogre_1.png";
import Ogre2 from "./assets/uf_heroes/ogre_2.png";
import Ogre3 from "./assets/uf_heroes/ogre_3.png";

import Torturer1 from "./assets/uf_heroes/warden_1.png";
import Torturer2 from "./assets/uf_heroes/warden_2.png";
import Torturer3 from "./assets/uf_heroes/warden_3.png";

import Zombie1 from "./assets/uf_heroes/zombie_b_1.png";
import Zombie2 from "./assets/uf_heroes/zombie_b_2.png";
import Zombie3 from "./assets/uf_heroes/zombie_b_3.png";

import Snake1 from "./assets/uf_heroes/snake_1.png";
import Snake2 from "./assets/uf_heroes/snake_2.png";
import Snake3 from "./assets/uf_heroes/snake_3.png";

import Goblin1 from "./assets/uf_heroes/goblin_1.png";
import Goblin2 from "./assets/uf_heroes/goblin_2.png";
import Goblin3 from "./assets/uf_heroes/goblin_3.png";

import Mimic1 from "./assets/uf_heroes/mimic_3.png";
import Mimic2 from "./assets/uf_heroes/mimic_2.png";
import Mimic3 from "./assets/uf_heroes/mimic_1.png";

function MonsterDisplay(props) {
    const { world, setWorld } = props;
    const [visibleMonsters, setVisibleMonsters] = useState([]);
    const [monsterIndex, setMonsterIndex] = useState(0);
    const [playerDefense, setPlayerDefense] = useState(
        world.player.attributes.defense
    );
    const [playerAttack, setPlayerAttack] = useState(
        world.player.attributes.attack
    );
    const [monsterPortrait, setMonsterPortrait] = useState(null);
    const [animationCount, setAnimationCount] = useState(1);
    const [maxMonsterHealth, setMaxMonsterHealth] = useState(20);

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [down, setDown] = useState(false);


    useEffect(() => {
        let interval = null;

        interval = setInterval(() => {
            if (animationCount === 3) {
                setAnimationCount((animationCount) => animationCount - 1);

            } else if (animationCount === 2 && down) {
                setAnimationCount((animationCount) => animationCount - 1);

                setDown(false);
            } else if (animationCount === 2) {
                setAnimationCount((animationCount) => animationCount + 1)

                setDown(true)
            } else {
                setAnimationCount((animationCount) => animationCount + 1);

            }
        }, 200);

        return () => clearInterval(interval);
    }, [isActive, animationCount]);

    useEffect(() => { }, []);

    useEffect(() => {
        setVisibleMonsters([...world.visibleMonsters]);

        setMonsterIndex(0);
        if (visibleMonsters) {
            calculateChanceToHit(visibleMonsters[0]);
            // console.log(visibleMonsters[monsterIndex], monsterIndex)
            // setMaxMonsterHealth(visibleMonsters[monsterIndex].attributes.health);
            // animationIterator();
        }
        setPlayerDefense(world.player.attributes.defense);
        setPlayerAttack(world.player.attributes.attack);

        // requireCorrectPortrait('assets/uf_heroes/archer_1.png')
    }, [world]);

    function changeMonsterFocus(num) {
        if (monsterIndex !== 0 && num < 0) {
            let newIndex = monsterIndex - 1;
            setMonsterIndex(newIndex);
        } else if (monsterIndex < visibleMonsters.length - 1 && num === 1) {
            let newIndex = monsterIndex + 1;
            setMonsterIndex(newIndex);
        } else if (monsterIndex === 0 && num < 0) {
            let newIndex = visibleMonsters.length - 1;
            setMonsterIndex(newIndex);
        } else {
            setMonsterIndex(0);
        }
    }

    function calculateChanceToHit(attack) {
        let hit = 20 - (playerDefense - attack);
        let chance = (hit / 20) * 100;
        return chance;
    }

    function calculateChanceToDodge(defense) {
        let totalAttack = 20 + playerAttack;

        let dodge = totalAttack - defense;
        let chance = (dodge / 20) * 100;
        if (chance > 100) {
            return 100;
        } else {
            return chance;
        }
    }

    function iterateAnimationCount(num) {
        setAnimationCount(num);
        return <div>NOTHING </div>;
    }

    return (
        <div
            className="fullMonsterBox"
            style={{
                margin: "0px",
                padding: "0px",
            }}
        >
            {visibleMonsters[0] ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {visibleMonsters.length > 1 ? (
                        <div className="button-container">
                            <button
                                className="focus-button"
                                style={{ color: "black" }}
                                onClick={() => {
                                    changeMonsterFocus(-1);
                                }}
                            >
                                Previous
              </button>
                            <button
                                className="focus-button"
                                style={{ color: "black" }}
                                onClick={() => {
                                    changeMonsterFocus(1);
                                }}
                            >
                                Next
              </button>
                        </div>
                    ) : (
                        <div></div>
                    )}

                    {/* <br /> */}
                    <h1 className="monster-name">
                        {visibleMonsters[monsterIndex].attributes.name}
                    </h1>

                    <div className="portrait-flavor">
                        <div className="portrait-image">
                            {/* LEVEL ONE MONSTER PORTRAITS */}

                            {visibleMonsters[monsterIndex].attributes.name === "Mimic" &&
                                animationCount === 1 ? (
                                <img src={Mimic1} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Mimic" &&
                                animationCount === 2 ? (
                                <img src={Mimic2} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Mimic" &&
                                animationCount === 3 ? (
                                <img src={Mimic3} />
                            ) : (
                                <div></div>
                            )}



                            {visibleMonsters[monsterIndex].attributes.name === "Zombie" &&
                                animationCount === 1 ? (
                                <img src={Zombie1} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Zombie" &&
                                animationCount === 2 ? (
                                <img src={Zombie2} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Zombie" &&
                                animationCount === 3 ? (
                                <img src={Zombie3} />
                            ) : (
                                <div></div>
                            )}

                            {visibleMonsters[monsterIndex].attributes.name === "Snake" &&
                                animationCount === 1 ? (
                                <img src={Snake1} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Snake" &&
                                animationCount === 2 ? (
                                <img src={Snake2} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Snake" &&
                                animationCount === 3 ? (
                                <img src={Snake3} />
                            ) : (
                                <div></div>
                            )}

                            {visibleMonsters[monsterIndex].attributes.name === "Goblin" &&
                                animationCount === 1 ? (
                                <img src={Goblin1} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Goblin" &&
                                animationCount === 2 ? (
                                <img src={Goblin2} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Goblin" &&
                                animationCount === 3 ? (
                                <img src={Goblin3} />
                            ) : (
                                <div></div>
                            )}

                            {/* LEVEL TWO MONSTER PORTRAITS */}
                            {visibleMonsters[monsterIndex].attributes.name === "Banshee" &&
                                animationCount === 1 ? (
                                <img src={Banshee1} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Banshee" &&
                                animationCount === 2 ? (
                                <img src={Banshee2} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Banshee" &&
                                animationCount === 3 ? (
                                <img src={Banshee3} />
                            ) : (
                                <div></div>
                            )}

                            {visibleMonsters[monsterIndex].attributes.name === "Ogre" &&
                                animationCount === 1 ? (
                                <img src={Ogre1} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Ogre" &&
                                animationCount === 2 ? (
                                <img src={Ogre2} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Ogre" &&
                                animationCount === 3 ? (
                                <img src={Ogre3} />
                            ) : (
                                <div></div>
                            )}

                            {visibleMonsters[monsterIndex].attributes.name === "Torturer" &&
                                animationCount === 1 ? (
                                <img src={Torturer1} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Torturer" &&
                                animationCount === 2 ? (
                                <img src={Torturer2} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Torturer" &&
                                animationCount === 3 ? (
                                <img src={Torturer3} />
                            ) : (
                                <div></div>
                            )}

                            {/* LEVEL THREE MONSTER PORTRAITS */}
                            {visibleMonsters[monsterIndex].attributes.name === "Demon" &&
                                animationCount === 1 ? (
                                <img src={Demon1} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Demon" &&
                                animationCount === 2 ? (
                                <img src={Demon2} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Demon" &&
                                animationCount === 3 ? (
                                <img src={Demon3} />
                            ) : (
                                <div></div>
                            )}

                            {visibleMonsters[monsterIndex].attributes.name === "Dragon" &&
                                animationCount === 1 ? (
                                <img src={Dragon1} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Dragon" &&
                                animationCount === 2 ? (
                                <img src={Dragon2} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Dragon" &&
                                animationCount === 3 ? (
                                <img src={Dragon3} />
                            ) : (
                                <div></div>
                            )}

                            {visibleMonsters[monsterIndex].attributes.name === "Golem" &&
                                animationCount === 1 ? (
                                <img src={Golem1} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Golem" &&
                                animationCount === 2 ? (
                                <img src={Golem2} />
                            ) : (
                                <div></div>
                            )}
                            {visibleMonsters[monsterIndex].attributes.name === "Golem" &&
                                animationCount === 3 ? (
                                <img src={Golem3} />
                            ) : (
                                <div></div>
                            )}
                        </div>

                        <div
                            className="flavortext-box"
                            style={{
                                minHeight: "125px",
                            }}
                        >
                            <p>
                                <em>{visibleMonsters[monsterIndex].attributes.flavortext}</em>
                            </p>
                        </div>
                    </div>

                    {(visibleMonsters[monsterIndex].attributes.name === "Stuarth") && <section
                        style={{
                            display: "flex",
                            textAlign: "center",
                            alignSelf: "center",
                            height: "3vh",
                            width: `450%`,
                            borderStyle: "solid",
                            borderColor: "black",
                            marginTop: "1vh",
                            marginBottom: "1vh",
                            backgroundColor: "gray",
                            zIndex: 1,
                        }}
                    >

                        {/* HEALTH BAR FOR BOSS TIER */}
                        {(visibleMonsters[monsterIndex].attributes.name === "Stuarth") ?
                            <section
                                style={{
                                    height: "100%",
                                    width: `${(visibleMonsters[monsterIndex].attributes.health / 200) * 100}%`,
                                    backgroundColor: "green",
                                    zIndex: 2,
                                    textAlign: "center",
                                    alignSelf: "center",
                                    color: "white",
                                }}
                            >
                                <p className="chance-text">
                                    HP: {visibleMonsters[monsterIndex].attributes.health}
                                </p>
                            </section>
                            :
                            <div></div>}


                        {/* HEALTH BAR FOR THIRD TIER */}
                        {(visibleMonsters[monsterIndex].attributes.name === "Golem" || visibleMonsters[monsterIndex].attributes.name === "Dragon" || visibleMonsters[monsterIndex].attributes.name === "Demon" || visibleMonsters[monsterIndex].attributes.name === "Mimic") ?
                            <section
                                style={{
                                    height: "100%",
                                    width: `${(visibleMonsters[monsterIndex].attributes.health / 62) * 100}%`,
                                    backgroundColor: "green",
                                    zIndex: 2,
                                    textAlign: "center",
                                    alignSelf: "center",
                                    color: "white",
                                }}
                            >
                                <p className="chance-text">
                                    HP: {visibleMonsters[monsterIndex].attributes.health}
                                </p>
                            </section>
                            :
                            <div></div>}

                        {/* HEALTH BAR FOR SECOND TIER */}
                        {(visibleMonsters[monsterIndex].attributes.name === "Torturer" || visibleMonsters[monsterIndex].attributes.name === "Ogre" || visibleMonsters[monsterIndex].attributes.name === "Banshee") ?
                            <section
                                style={{
                                    height: "100%",
                                    width: `${(visibleMonsters[monsterIndex].attributes.health / 30) * 100}%`,
                                    backgroundColor: "green",
                                    zIndex: 2,
                                    textAlign: "center",
                                    alignSelf: "center",
                                    color: "white",
                                }}
                            >
                                <p className="chance-text">
                                    HP: {visibleMonsters[monsterIndex].attributes.health}
                                </p>
                            </section>
                            :
                            <div></div>}

                        {/* HEALTH BAR FOR FIRST TIER */}
                        {(visibleMonsters[monsterIndex].attributes.name === "Goblin" || visibleMonsters[monsterIndex].attributes.name === "Snake" || visibleMonsters[monsterIndex].attributes.name === "Zombie") ?
                            <section
                                style={{
                                    height: "100%",
                                    width: `${(visibleMonsters[monsterIndex].attributes.health / 18) * 100}%`,
                                    backgroundColor: "green",
                                    zIndex: 2,
                                    textAlign: "center",
                                    alignSelf: "center",
                                    color: "white",
                                }}
                            >
                                <p className="chance-text">
                                    HP: {visibleMonsters[monsterIndex].attributes.health}
                                </p>
                            </section>
                            :
                            <div></div>}

                    </section>}


                    {(visibleMonsters[monsterIndex].attributes.name !== "Stuarth") && <section
                        style={{
                            display: "flex",
                            textAlign: "center",
                            alignSelf: "center",
                            height: "3vh",
                            width: `80%`,
                            borderStyle: "solid",
                            borderColor: "black",
                            marginTop: "1vh",
                            marginBottom: "1vh",
                            backgroundColor: "gray",
                            zIndex: 1,
                        }}
                    >

                        {/* HEALTH BAR FOR BOSS TIER */}
                        {(visibleMonsters[monsterIndex].attributes.name === "Stuarth") ?
                            <section
                                style={{
                                    height: "100%",
                                    width: `${(visibleMonsters[monsterIndex].attributes.health / 200) * 100}%`,
                                    backgroundColor: "green",
                                    zIndex: 2,
                                    textAlign: "center",
                                    alignSelf: "center",
                                    color: "white",
                                }}
                            >
                                <p className="chance-text">
                                    HP: {visibleMonsters[monsterIndex].attributes.health}
                                </p>
                            </section>
                            :
                            <div></div>}


                        {/* HEALTH BAR FOR THIRD TIER */}
                        {(visibleMonsters[monsterIndex].attributes.name === "Golem" || visibleMonsters[monsterIndex].attributes.name === "Dragon" || visibleMonsters[monsterIndex].attributes.name === "Demon" || visibleMonsters[monsterIndex].attributes.name === "Mimic") ?
                            <section
                                style={{
                                    height: "100%",
                                    width: `${(visibleMonsters[monsterIndex].attributes.health / 62) * 100}%`,
                                    backgroundColor: "green",
                                    zIndex: 2,
                                    textAlign: "center",
                                    alignSelf: "center",
                                    color: "white",
                                }}
                            >
                                <p className="chance-text">
                                    HP: {visibleMonsters[monsterIndex].attributes.health}
                                </p>
                            </section>
                            :
                            <div></div>}

                        {/* HEALTH BAR FOR SECOND TIER */}
                        {(visibleMonsters[monsterIndex].attributes.name === "Torturer" || visibleMonsters[monsterIndex].attributes.name === "Ogre" || visibleMonsters[monsterIndex].attributes.name === "Banshee") ?
                            <section
                                style={{
                                    height: "100%",
                                    width: `${(visibleMonsters[monsterIndex].attributes.health / 30) * 100}%`,
                                    backgroundColor: "green",
                                    zIndex: 2,
                                    textAlign: "center",
                                    alignSelf: "center",
                                    color: "white",
                                }}
                            >
                                <p className="chance-text">
                                    HP: {visibleMonsters[monsterIndex].attributes.health}
                                </p>
                            </section>
                            :
                            <div></div>}

                        {/* HEALTH BAR FOR FIRST TIER */}
                        {(visibleMonsters[monsterIndex].attributes.name === "Goblin" || visibleMonsters[monsterIndex].attributes.name === "Snake" || visibleMonsters[monsterIndex].attributes.name === "Zombie") ?
                            <section
                                style={{
                                    height: "100%",
                                    width: `${(visibleMonsters[monsterIndex].attributes.health / 18) * 100}%`,
                                    backgroundColor: "green",
                                    zIndex: 2,
                                    textAlign: "center",
                                    alignSelf: "center",
                                    color: "white",
                                }}
                            >
                                <p className="chance-text">
                                    HP: {visibleMonsters[monsterIndex].attributes.health}
                                </p>
                            </section>
                            :
                            <div></div>}

                    </section>}




                    {(visibleMonsters[monsterIndex].attributes.name === "Stuarth") && <section
                        style={{
                            display: "flex",
                            alignSelf: "center",
                            height: "3vh",
                            width: `450%`,
                            borderStyle: "solid",
                            borderColor: "black",
                            marginTop: "1vh",
                            marginBottom: "1vh",
                            backgroundColor: "grey",
                            zIndex: 1,
                        }}
                    >
                        <section
                            style={{
                                height: "100%",
                                width: `${visibleMonsters[monsterIndex].attributes.damage * 5
                                    }%`,
                                backgroundColor: "darkred",
                                zIndex: 2,
                                textAlign: "center",
                                color: "white",
                            }}
                        >
                            <p className="chance-text">Attack Power</p>
                        </section>
                    </section>}


                    {(visibleMonsters[monsterIndex].attributes.name !== "Stuarth") && <section
                        style={{
                            display: "flex",
                            alignSelf: "center",
                            height: "3vh",
                            width: `80%`,
                            borderStyle: "solid",
                            borderColor: "black",
                            marginTop: "1vh",
                            marginBottom: "1vh",
                            backgroundColor: "grey",
                            zIndex: 1,
                        }}
                    >
                        <section
                            style={{
                                height: "100%",
                                width: `${visibleMonsters[monsterIndex].attributes.damage * 5
                                    }%`,
                                backgroundColor: "darkred",
                                zIndex: 2,
                                textAlign: "center",
                                color: "white",
                            }}
                        >
                            <p className="chance-text">Attack Power</p>
                        </section>
                    </section>}





                    {(visibleMonsters[monsterIndex].attributes.name === "Stuarth") && <section
                        style={{
                            display: "flex",
                            height: "3vh",
                            width: `450%`,
                            alignSelf: "center",
                            borderStyle: "solid",
                            borderColor: "black",
                            marginTop: "1vh",
                            marginBottom: "1vh",
                            backgroundColor: "grey",
                            zIndex: 1,
                        }}
                    >
                        <p className="chance-text">
                            Chance to Hit Player:{" "}
                            {Math.floor(
                                calculateChanceToHit(
                                    visibleMonsters[monsterIndex].attributes.attack
                                )
                            )}
              %
            </p>
                        <section
                            style={{
                                height: "100%",
                                width: `${calculateChanceToHit(
                                    visibleMonsters[monsterIndex].attributes.attack
                                )}%`,
                                backgroundColor: "black",
                                zIndex: 2,
                                textAlign: "center",
                                color: "white",
                            }}
                        ></section>
                    </section>}

                    {(visibleMonsters[monsterIndex].attributes.name !== "Stuarth") && <section
                        style={{
                            display: "flex",
                            height: "3vh",
                            width: `80%`,
                            alignSelf: "center",
                            borderStyle: "solid",
                            borderColor: "black",
                            marginTop: "1vh",
                            marginBottom: "1vh",
                            backgroundColor: "grey",
                            zIndex: 1,
                        }}
                    >
                        <p className="chance-text">
                            Chance to Hit Player:{" "}
                            {Math.floor(
                                calculateChanceToHit(
                                    visibleMonsters[monsterIndex].attributes.attack
                                )
                            )}
              %
            </p>
                        <section
                            style={{
                                height: "100%",
                                width: `${calculateChanceToHit(
                                    visibleMonsters[monsterIndex].attributes.attack
                                )}%`,
                                backgroundColor: "black",
                                zIndex: 2,
                                textAlign: "center",
                                color: "white",
                            }}
                        ></section>
                    </section>}





                    {(visibleMonsters[monsterIndex].attributes.name === "Stuarth") && <section
                        style={{
                            display: "flex",
                            flexDirection: "center",
                            justifySelf: "center",
                            alignSelf: "center",
                            height: "3vh",
                            width: `450%`,
                            borderStyle: "solid",
                            borderColor: "black",
                            marginTop: "1vh",
                            marginBottom: "1vh",
                            backgroundColor: "grey",
                            zIndex: 1,
                        }}
                    >
                        <section
                            style={{
                                height: "100%",
                                width: `${100 -
                                    calculateChanceToDodge(
                                        visibleMonsters[monsterIndex].attributes.defense
                                    )
                                    }%`,
                                backgroundColor: "darkblue",
                                zIndex: 2,
                                textAlign: "center",
                                color: "white",
                            }}
                        >
                            <p className="chance-text">
                                Player Chance to Miss:{" "}
                                {100 -
                                    calculateChanceToDodge(
                                        visibleMonsters[monsterIndex].attributes.defense
                                    )}
                %
              </p>
                        </section>
                    </section>}

                    {(visibleMonsters[monsterIndex].attributes.name !== "Stuarth") && <section
                        style={{
                            display: "flex",
                            flexDirection: "center",
                            justifySelf: "center",
                            alignSelf: "center",
                            height: "3vh",
                            width: `80%`,
                            borderStyle: "solid",
                            borderColor: "black",
                            marginTop: "1vh",
                            marginBottom: "1vh",
                            backgroundColor: "grey",
                            zIndex: 1,
                        }}
                    >
                        <section
                            style={{
                                height: "100%",
                                width: `${100 -
                                    calculateChanceToDodge(
                                        visibleMonsters[monsterIndex].attributes.defense
                                    )
                                    }%`,
                                backgroundColor: "darkblue",
                                zIndex: 2,
                                textAlign: "center",
                                color: "white",
                            }}
                        >
                            <p className="chance-text">
                                Player Chance to Miss:{" "}
                                {100 -
                                    calculateChanceToDodge(
                                        visibleMonsters[monsterIndex].attributes.defense
                                    )}
                %
              </p>
                        </section>
                    </section>}




                </div>
            ) : (
                <div
                    style={{
                        paddingTop:'10%'
                    }}
                >Monsters: None</div>
            )}
        </div>
    );
}

export default MonsterDisplay;
