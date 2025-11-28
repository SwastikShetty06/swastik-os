import React, { useEffect, useRef, useState } from 'react';
import { ASSETS, TILES, OBJECTS, TILE_SIZE } from './game/assets';
import { INITIAL_MAP } from './game/maps';

const GameResumeApp = () => {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState({
        player: { x: INITIAL_MAP.startPos.x, y: INITIAL_MAP.startPos.y, direction: 'down', isMoving: false },
        map: INITIAL_MAP,
        dialogue: null,
    });

    // Input state
    const keys = useRef({});
    // Image refs
    const tilesetRef = useRef(null);
    const characterRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Load Images
        const tileset = new Image();
        const character = new Image();

        let loadedCount = 0;
        const totalImages = 2;

        const checkLoaded = () => {
            loadedCount++;
            if (loadedCount === totalImages) {
                tilesetRef.current = tileset;
                characterRef.current = character;
                setImagesLoaded(true);
            }
        };

        const handleError = (e, src) => {
            console.error(`Failed to load image: ${src}`, e);
            setError(`Failed to load asset: ${src}`);
        };

        tileset.onload = checkLoaded;
        tileset.onerror = (e) => handleError(e, ASSETS.images.tileset);

        character.onload = checkLoaded;
        character.onerror = (e) => handleError(e, ASSETS.images.character);

        // Set src AFTER handlers
        tileset.src = ASSETS.images.tileset;
        character.src = ASSETS.images.character;

        const handleKeyDown = (e) => {
            keys.current[e.key] = true;
            if (e.key === 'Enter' || e.key === ' ') {
                handleInteraction();
            }
        };
        const handleKeyUp = (e) => {
            keys.current[e.key] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Mutable state for the loop
    const stateRef = useRef({
        player: { x: INITIAL_MAP.startPos.x, y: INITIAL_MAP.startPos.y, direction: 'down', moveTimer: 0 },
        map: INITIAL_MAP,
        dialogue: null
    });

    const [uiState, setUiState] = useState({ dialogue: null });

    const handleInteraction = () => {
        const { player, map, dialogue } = stateRef.current;

        if (dialogue) {
            stateRef.current.dialogue = null;
            setUiState({ dialogue: null });
            return;
        }

        const object = map.objects.find(obj => {
            const dx = Math.abs(obj.x - player.x);
            const dy = Math.abs(obj.y - player.y);
            return dx + dy <= 1;
        });

        if (object) {
            stateRef.current.dialogue = { title: object.name, text: object.text };
            setUiState({ dialogue: { title: object.name, text: object.text } });
        }
    };

    const update = () => {
        const state = stateRef.current;
        if (state.dialogue) return;

        if (Date.now() - state.player.moveTimer < 150) return;

        let dx = 0;
        let dy = 0;

        if (keys.current['ArrowUp'] || keys.current['w']) dy = -1;
        else if (keys.current['ArrowDown'] || keys.current['s']) dy = 1;
        else if (keys.current['ArrowLeft'] || keys.current['a']) dx = -1;
        else if (keys.current['ArrowRight'] || keys.current['d']) dx = 1;

        if (dx !== 0 || dy !== 0) {
            const newX = state.player.x + dx;
            const newY = state.player.y + dy;

            if (
                newX >= 0 && newX < state.map.width &&
                newY >= 0 && newY < state.map.height &&
                state.map.collisions[newY][newX] === 0
            ) {
                state.player.x = newX;
                state.player.y = newY;
                state.player.moveTimer = Date.now();
            }
        }
    };

    const draw = (ctx) => {
        if (!imagesLoaded || !tilesetRef.current || !characterRef.current) return;

        const state = stateRef.current;
        const { width, height, tiles, objects } = state.map;

        // Clear
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw Map
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const tileId = tiles[y][x];
                let tileCoords = ASSETS.tiles.floor; // Default

                if (tileId === TILES.GRASS) tileCoords = ASSETS.tiles.grass;
                if (tileId === TILES.WALL) tileCoords = ASSETS.tiles.wall;
                if (tileId === TILES.WATER) tileCoords = ASSETS.tiles.water;

                ctx.drawImage(
                    tilesetRef.current,
                    tileCoords.x * TILE_SIZE, tileCoords.y * TILE_SIZE, TILE_SIZE, TILE_SIZE, // Source
                    x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE // Dest
                );
            }
        }

        // Draw Objects
        objects.forEach(obj => {
            let tileCoords = null;
            if (obj.type === OBJECTS.ITEM) tileCoords = ASSETS.objects.chest;
            if (obj.type === OBJECTS.SIGN) tileCoords = ASSETS.objects.sign;

            if (tileCoords) {
                ctx.drawImage(
                    tilesetRef.current,
                    tileCoords.x * TILE_SIZE, tileCoords.y * TILE_SIZE, TILE_SIZE, TILE_SIZE,
                    obj.x * TILE_SIZE, obj.y * TILE_SIZE, TILE_SIZE, TILE_SIZE
                );
            } else if (obj.type === OBJECTS.NPC) {
                // Draw NPC (using character sprite for now, maybe tinted or different frame)
                // Just draw a simple circle for NPC if no sprite, or use character sprite
                ctx.fillStyle = '#fbbf24';
                ctx.beginPath();
                ctx.arc(obj.x * TILE_SIZE + TILE_SIZE / 2, obj.y * TILE_SIZE + TILE_SIZE / 2, TILE_SIZE / 3, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Draw Player
        // Assuming character sheet has 32x32 frames. 
        // 0,0 is idle/down.
        ctx.drawImage(
            characterRef.current,
            0, 0, TILE_SIZE, TILE_SIZE,
            state.player.x * TILE_SIZE, state.player.y * TILE_SIZE, TILE_SIZE, TILE_SIZE
        );
    };

    // Game Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        // Disable smoothing for pixel art
        ctx.imageSmoothingEnabled = false;

        let animationFrameId;

        const render = () => {
            update();
            draw(ctx);
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [imagesLoaded]);

    return (
        <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
            {!imagesLoaded && !error && <div className="text-white">Loading assets...</div>}
            {error && <div className="text-red-500 font-bold p-4 bg-black/80 rounded border border-red-500">{error}</div>}
            <canvas
                ref={canvasRef}
                width={INITIAL_MAP.width * TILE_SIZE}
                height={INITIAL_MAP.height * TILE_SIZE}
                className="border-4 border-gray-700 shadow-2xl bg-black"
                style={{ imageRendering: 'pixelated' }}
            />

            {/* UI Overlay */}
            <div className="absolute top-4 left-4 text-white font-mono text-sm bg-black/50 p-2 rounded pointer-events-none">
                <p>Controls: Arrow Keys to Move</p>
                <p>Space/Enter to Interact</p>
            </div>

            {/* Dialogue Box */}
            {uiState.dialogue && (
                <div className="absolute bottom-4 left-4 right-4 bg-white border-4 border-blue-800 p-4 rounded shadow-lg font-mono z-10">
                    <h3 className="font-bold text-blue-900 mb-1">{uiState.dialogue.title}</h3>
                    <p className="text-gray-800">{uiState.dialogue.text}</p>
                    <p className="text-xs text-gray-500 mt-2 animate-pulse">Press Space to close</p>
                </div>
            )}
        </div>
    );
};

export default GameResumeApp;
