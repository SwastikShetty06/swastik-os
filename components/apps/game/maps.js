import { TILES, OBJECTS } from './assets';

// 0: Grass, 1: Wall, 2: Water, 3: Floor
const W = TILES.WALL;
const G = TILES.GRASS;
const F = TILES.FLOOR;
const A = TILES.WATER;

export const INITIAL_MAP = {
    width: 15,
    height: 10,
    // Visual Layer
    tiles: [
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, F, F, F, W, F, F, F, F, F, F, F, F, F, W],
        [W, F, F, F, W, F, F, F, F, F, F, F, F, F, W],
        [W, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
        [W, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
        [W, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
        [W, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
        [W, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
        [W, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    ],
    // Collision Layer (1 = blocked, 0 = walkable)
    collisions: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    // Objects / Interactions
    objects: [
        { x: 2, y: 2, type: OBJECTS.NPC, id: 'guide', name: 'Guide', text: 'Welcome to Swastik\'s Resume World! Explore to find out more.' },
        { x: 8, y: 4, type: OBJECTS.ITEM, id: 'skill_react', name: 'React Gem', text: 'You found the React Skill! Proficiency: Advanced.' },
        { x: 12, y: 2, type: OBJECTS.SIGN, id: 'sign_projects', name: 'Projects', text: 'North: Project Gallery. South: Experience City.' },
    ],
    startPos: { x: 7, y: 5 }
};
