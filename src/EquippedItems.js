import React, { useRef, useEffect, useState } from "react";

const EquippedItems = (props) => {
  let world = props.world;
  let atlases = props.atlases;
  const [context, setContext] = useState(null);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setContext(context);
    context.clearRect(0, 0, 96, 96);
    context.drawImage(atlases.heroAtlas, 48, 96, 48, 48, 0, 0, 96, 96);
    context.strokeRect(36, 10, 24, 24);
    context.strokeRect(36, 34, 24, 30);
    context.strokeRect(12, 26, 24, 42);
    context.strokeRect(60, 26, 24, 42);

    if (world.player.head[0]) {
      context.drawImage(
        atlases.itemAtlas,
        world.player.head[0].spriteSheetCoordinates.x,
        world.player.head[0].spriteSheetCoordinates.y,
        48,
        48,
        24,
        -5,
        48,
        48
      );
    }

    if (world.player.torso[0]) {
      context.drawImage(
        atlases.itemAtlas,
        world.player.torso[0].spriteSheetCoordinates.x,
        world.player.torso[0].spriteSheetCoordinates.y,
        48,
        48,
        24,
        24,
        48,
        48
      );
    }

    if (world.player.left[0]) {
      context.drawImage(
        atlases.itemAtlas,
        world.player.left[0].spriteSheetCoordinates.x,
        world.player.left[0].spriteSheetCoordinates.y,
        48,
        48,
        0,
        24,
        48,
        48
      );
    }

    if (world.player.right[0]) {
      context.drawImage(
        atlases.itemAtlas,
        world.player.right[0].spriteSheetCoordinates.x,
        world.player.right[0].spriteSheetCoordinates.y,
        48,
        48,
        48,
        24,
        48,
        48
      );
    }
  }, [world]);

  return (
    <div>
      <canvas ref={canvasRef} width="96" height="96" />
    </div>
  );
};

export default EquippedItems;
