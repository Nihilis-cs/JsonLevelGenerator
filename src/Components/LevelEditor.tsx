import { Button } from 'antd';
import * as React from 'react';
import { useEffect, useState } from 'react';
import useImage from 'use-image';
import { Coords, Level, LevelEditorParams, TileSet } from '../Types/level.types';
import { CellEditor } from './CellEditor';


interface LevelEditorProps {
    params: LevelEditorParams;
    level: Level;
}


function LevelEditor({ params, level }: LevelEditorProps) {
    const TILE_SIZE: number = 32;
    const CAN_W: number = 1000;
    const CAN_H: number = 800;
    //const level: Level = { grid: [] };

    const captureMousePos = (e: React.MouseEvent) => {
        var coords = isoTo2D({ posX: e.clientX, posY: e.clientY })
        var mouseX: number = Math.round(coords.posX / TILE_SIZE) - TILE_SIZE / 2;
        var mouseY: number = Math.round(coords.posY / TILE_SIZE) + 7;
        if (mouseX >= 0 && mouseX < params.columns && mouseY >= 0 && mouseY < params.lines) {
            setActiveCell({ posX: mouseX, posY: mouseY });
        }
        else {
            alert(mouseX + ", " + mouseY + " Out of bounds");
        }
    }
    const [isInitialized, setInitialized] = useState<boolean>(false);
    useEffect(() => {
        initializeGrid();
        setInitialized(true);
    })
    const initializeGrid = () => {
        for (let i = 0; i < level.grid.length; i++) {
            for (let j = 0; j < level.grid[i].length; j++) {
                getTile(level.grid[i][j].tileCode[0]);
            }
        }
        console.log("drawing...");
        console.log(level.grid);
    };
    const [activeCell, setActiveCell] = useState<Coords>({ posX: 0, posY: 0 });

    const getTile = (tile: TileSet) => {
        const img = new Image();
        img.src = '../../tiles/' + tile.tileCode + '.png';
        return img;
    };
    const draw = () => {
        //initializeGrid();
        console.log("drawing...");
        console.log(level.grid);
        const can = document.getElementById('mainCanvas') as HTMLCanvasElement;
        if (can?.getContext) {
            const ctx = can?.getContext("2d");
            for (let i = 0; i < level.grid.length; i++) {
                for (let j = 0; j < level.grid[i].length; j++) {
                    for (let k = 0; k < level.grid[i][j].tileCode.length; k++) {
                        let coords = twoDToIso({ posX: j * TILE_SIZE, posY: i * TILE_SIZE })
                        ctx?.drawImage(getTile(level.grid[i][j].tileCode[k]), coords.posX + CAN_W / 2, coords.posY);
                    }
                }
            }
        }
    }
    const twoDToIso = (pt: Coords): Coords => {
        let newX = pt.posX - pt.posY;
        let newY = (pt.posX + pt.posY) / 2;
        return { posX: newX, posY: newY };
    }

    const isoTo2D = (pt: Coords): Coords => {
        let newX = (2 * pt.posY + pt.posX) / 2;
        let newY = (2 * pt.posY - pt.posX) / 2;
        return { posX: newX, posY: newY };
    }

    return <>
        <div>
            <span className='text-2xl'>Level Editor</span>
            <span>Selected Cell: {activeCell.posX}, {activeCell.posY}</span>
            <Button onClick={() => draw()}> DRAW </Button>
            {/* <CellEditor cell={level.grid[activeCell.posY][activeCell.posX]}></CellEditor> */}
        </div>
        <div className='w-full h-full'>
            <canvas id="mainCanvas" width={CAN_W} height={CAN_H} onClick={(e) => captureMousePos(e)}>
            </canvas>
        </div >
    </>
}

export default LevelEditor;
