export const TILE_SIZE = 32;

export const ASSETS = {
    images: {
        tileset: '/swastik-os/game/tileset.png',
        character: '/swastik-os/game/character.png',
    },
    // Define where each tile is located in the tileset (x, y index)
    tiles: {
        grass: { x: 0, y: 0 },
        wall: { x: 1, y: 0 },
        water: { x: 2, y: 0 },
        floor: { x: 3, y: 0 },
        door: { x: 4, y: 0 },
    },
    objects: {
        chest: { x: 5, y: 0 },
        sign: { x: 6, y: 0 },
    }
};

export const TILES = {
    GRASS: 0,
    WALL: 1,
    WATER: 2,
    FLOOR: 3,
    DOOR: 4,
};

export const OBJECTS = {
    NPC: 10,
    ITEM: 11,
    SIGN: 12,
};
