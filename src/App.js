import ReactRogue from "./ReactRogue";
import LandingPage from './LandingPage';
import Cave from './assets/sounds/Eerie_Cave.mp3'
import Dagger from './assets/sounds/dagger.mp3'
import ReactHowler from 'react-howler'
import useSound from 'use-sound'

import React, { useEffect, useState } from "react";
import heros from "./assets/uf_heroes_simple.png";
import terrain from "./assets/uf_terrain.png";
import items from "./assets/uf_items.png";
import fx from "./assets/uf_FX.png";

const App = () => {
  const [atlases, setAtlases] = useState(null);
  const [newGame, setNewGame] = useState(false);
  // const [daggerPlay, setDaggerPlay] = useState(false) 

  const DaggerSound = () => {
    const [play] = useSound(Dagger)
    return <button onClick={play}></button>
  }

  useEffect(() => {
    const heroAtlas = new Image();
    heroAtlas.src = heros;
    heroAtlas.onload = () => {
      const itemAtlas = new Image();
      itemAtlas.src = items;
      itemAtlas.onload = () => {
        const terrainAtlas = new Image();
        terrainAtlas.src = terrain;
        terrainAtlas.onload = () => {
          const fxAtlas = new Image();
          fxAtlas.src = fx;
          fxAtlas.onload = () => {
            setAtlases({ heroAtlas, itemAtlas, terrainAtlas, fxAtlas });
          };
        };
      };
    };
  }, []);

  const startGame = () => {
    setNewGame(!newGame);
  };

  return (
    <div className="App">
      {
        <ReactHowler
          src={Cave}
          volume={0.5}
          loop={true}
          playing={true}
          seek={3}
        />
      }

          {!atlases ? (
        <div>Loading</div>
      ) : (
        <div>
          {!newGame && (
            <div className="welcome">
              <LandingPage startGame={startGame} />
            </div>
          )}
          {newGame && (
            <div className="gameMap">
              <ReactRogue
                width={40}
                height={40}
                tilesize={24}
                atlases={atlases}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
