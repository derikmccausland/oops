class Entity {
  constructor(x, y, size, attributes) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.attributes = { ...attributes };
    this.tilesize = 24;
  }

  action(verb, world) {
    console.log(`Verb: ${verb}`);
  }

  draw(context, entity, atlases) {
    if (entity.attributes.spriteSheet === "heroAtlas") {
      context.drawImage(
        atlases.heroAtlas,
        entity.attributes.spriteSheetCoordinates.x,
        entity.attributes.spriteSheetCoordinates.y,
        48,
        48,
        this.x * this.tilesize,
        this.y * this.tilesize,
        this.tilesize,
        this.tilesize
      );
    } else if (entity.attributes.spriteSheet === "itemAtlas") {
      context.drawImage(
        atlases.itemAtlas,
        entity.attributes.spriteSheetCoordinates.x,
        entity.attributes.spriteSheetCoordinates.y,
        48,
        48,
        this.x * this.tilesize,
        this.y * this.tilesize,
        this.tilesize,
        this.tilesize
      );
    } else if (entity.attributes.spriteSheet === "terrainAtlas") {
      context.drawImage(
        atlases.terrainAtlas,
        entity.attributes.spriteSheetCoordinates.x,
        entity.attributes.spriteSheetCoordinates.y,
        48,
        48,
        this.x * this.tilesize,
        this.y * this.tilesize,
        this.tilesize,
        this.tilesize
      );
    } else if (
      entity.attributes.spriteSheet === "fxAtlas" &&
      entity.attributes.name === "blastwave"
    ) {
      context.drawImage(
        atlases.fxAtlas,
        entity.attributes.spriteSheetCoordinates.x,
        entity.attributes.spriteSheetCoordinates.y,
        24,
        24,
        this.x * this.tilesize,
        this.y * this.tilesize,
        this.tilesize * 3,
        this.tilesize * 3
      );
    } else if (entity.attributes.spriteSheet === "fxAtlas") {
      console.log("drawing fx");
      context.drawImage(
        atlases.fxAtlas,
        entity.attributes.spriteSheetCoordinates.x,
        entity.attributes.spriteSheetCoordinates.y,
        24,
        24,
        this.x * this.tilesize,
        this.y * this.tilesize,
        this.tilesize,
        this.tilesize
      );
    }
  }
}

export default Entity;
