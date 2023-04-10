import { Button } from 'antd';
import * as React from 'react';
import { useEffect, useState } from 'react';
import useImage from 'use-image';
import { CellEditor } from './CellEditor';


interface LevelEditorProps {
    params: LevelEditorParams;
}
export type LevelEditorParams = {
    lines: number;
    columns: number;
    isInitializedProp: boolean;
}
export type Coords = {
    posX: number;
    posY: number;
}
export type Content = {
    positionGrid: Coords;
    posZ: number;
    sprite_index: string;
    image_index: number;
    image_xscale: number;
    image_yscale: number;
    x: number;
    y: number;
}

export type ContentAlt = {
    tileCode: number,
    heightPixels: number,
    isWalkable: boolean,
    content: Content[];
}

export type IsoCell = {
    tileCode: TileSet[];
    heightPixels: number;
    isWalkable: boolean;
    content: Content[];
}
export type TileSet = {
    tileCode: number;
    posZ: number;
}

export type Level = {
    grid: IsoCell[][];
}

function LevelEditor({ params }: LevelEditorProps) {
    const TILE_SIZE: number = 32;
    const CAN_W : number = 1000;
    const CAN_H : number = 800;
    const level: Level = { grid: [] };

    const captureMousePos = (e: React.MouseEvent) => {
        var coords = isoTo2D({posX: e.clientX, posY: e.clientY})
        var mouseX: number = Math.round(coords.posX/TILE_SIZE) - TILE_SIZE/2;
        var mouseY: number = Math.round(coords.posY/TILE_SIZE) + 7;
        // if (mouseX > 0 && mouseX <= params.columns && mouseY > 0 && mouseY <= params.lines)
        // {
            setActiveCell({posX: mouseX, posY: mouseY});
        // }
        // else{
        //     alert(mouseX + ", " + mouseY +" Out of bounds");
        // }
    }

    const initializeGrid = () => {
        level.grid = [];
        for (let i = 0; i < params.lines; i++) {
            level.grid[i] = [];
            for (let j = 0; j < params.columns; j++) {
                level.grid[i][j] = { tileCode: [{ tileCode: 1, posZ: 0 }], heightPixels: 0, isWalkable: true, content: [] };
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
        initializeGrid();
        const can = document.getElementById('mainCanvas') as HTMLCanvasElement;
        if (can?.getContext) {
            const ctx = can?.getContext("2d");
            for (let i = 0; i < level.grid.length; i++) {
                for (let j = 0; j < level.grid[i].length; j++) {
                    for (let k = 0; k < level.grid[i][j].tileCode.length; k++ ) {
                        let coords = twoDToIso({ posX: j * TILE_SIZE, posY: i * TILE_SIZE })
                        ctx?.drawImage(getTile(level.grid[i][j].tileCode[k]), coords.posX+CAN_W/2, coords.posY);
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
        let newX = (2*pt.posY + pt.posX)/2;
        let newY = (2*pt.posY - pt.posX)/2;
        return { posX: newX, posY: newY };
    }

    return <>
        <div>
            <span className='text-2xl'>Level Editor</span>
            <span>Selected Cell: {activeCell.posX}, {activeCell.posY}</span>
            <Button onClick={() => draw()}> DRAW </Button>
            <CellEditor cell={level.grid[activeCell.posY][activeCell.posY]}></CellEditor>
        </div>
        <div className='w-full h-full'>
            <canvas id="mainCanvas" width={CAN_W} height={CAN_H} onClick={(e) => captureMousePos(e)}>
            </canvas>
        </div >
    </>
}

export default LevelEditor;
