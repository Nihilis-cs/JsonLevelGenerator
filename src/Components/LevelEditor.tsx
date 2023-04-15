import * as React from 'react';
import { useEffect, useState } from 'react';
import { Coords, IsoCell, Level, TileSet } from '../Types/level.types';
import { Sprite, Stage } from '@pixi/react';
import { CellEditor } from './CellEditor';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input } from 'antd';
import { CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined, CaretUpOutlined } from '@ant-design/icons';




export interface ILevelEditorTableProps {
    lines: number;
    columns: number;
}

export type Dimensions = {
    w: number;
    h: number;
}


export function LevelEditor(props: ILevelEditorTableProps) {
    const newCell = { tileCode: [{ tileCode: 8, posZ: 0 }], heightPixels: 0, isWalkable: true, content: [], contentAlt: [] }
    const [level, setLevel] = useState<Level>({ grid: [[newCell]] });
    const [activeCell, setActiveCell] = useState<Coords>({ posX: 0, posY: 0 });
    const TILE_SIZE: number = 16;
    const [dimensions, setDimensions] = useState<Dimensions>({ w: 1248, h: 800 })
    const { control, handleSubmit } = useForm<Coords>();
    const [isEditorOpen, setEditorOpen] = useState<boolean>(false);

    const captureMousePos = (e: React.MouseEvent) => {
        var coords = isoTo2D({ posX: e.clientX, posY: e.clientY })
        var mouseX: number = Math.round(coords.posX / TILE_SIZE) - TILE_SIZE / 2;
        var mouseY: number = Math.round(coords.posY / TILE_SIZE) + 7;
        if (mouseX >= 0 && mouseX < props.columns && mouseY >= 0 && mouseY < props.lines) {
            setActiveCell({ posX: mouseX, posY: mouseY });
        }
        else {
            alert(mouseX + ", " + mouseY + " Out of bounds");
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

    useEffect(() => {
        var vLevel: Level = { grid: [] };
        for (let yy = 0; yy < props.columns; yy++) {
            vLevel.grid[yy] = [];
            for (let xx = 0; xx < props.lines; xx++) {
                vLevel.grid[yy][xx] = newCell;
            }

        }
        setDimensions({ w: props.columns * TILE_SIZE * 2 + TILE_SIZE * 2, h: props.lines * TILE_SIZE + TILE_SIZE * 2 });
        setLevel(vLevel);
        console.log(level.grid);
    }, [props.lines, props.columns]);

    const moveCursor = (dir: string) => {
        if (dir === 'r' && activeCell.posX < props.columns - 1) {
            setActiveCell({ posX: activeCell.posX + 1, posY: activeCell.posY })
        }
        if (dir === 'l' && activeCell.posX > 0) {
            setActiveCell({ posX: activeCell.posX - 1, posY: activeCell.posY })
        }
        if (dir === 'u' && activeCell.posY > 0) {
            setActiveCell({ posX: activeCell.posX, posY: activeCell.posY - 1 })
        }
        if (dir === 'd' && activeCell.posY < props.lines - 1) {
            setActiveCell({ posX: activeCell.posX, posY: activeCell.posY + 1 })
        }
    }

    const getTile = (tile: TileSet) => {
        const img = new Image();
        img.src = '../../tiles/' + tile.tileCode + '.png';
        console.log(img.src)
        return img;
    };
    const getCursor = () => {
        const img = new Image();
        img.src = "../../gui/cursor.png";
        return img;
    }
    const onSubmit = (data: Coords) => {
        setActiveCell(data);
    }

    const onSave = () => {
        var exportLevel = JSON.stringify(level);
        console.log(exportLevel);
    }

    const editCell = (cell: IsoCell) => {
        if (cell != undefined) {
            var vLevel = level;
            vLevel.grid[activeCell.posY][activeCell.posX] = cell;
            console.log("cell updated");
            setLevel(vLevel);
            console.log("level updated");
        }

        setEditorOpen(false);
    }


    return (
        <div>
            <div className=''>
                <div>
                    <Button type="default" onClick={onSave}>Save Level</Button>
                    ActiveCell: {activeCell.posX}, {activeCell.posY}
                    <div className='grid grid-cols-4'>
                        <div className="grid grid-cols-4">
                            <div></div>
                            <div><Button onClick={() => moveCursor('u')}><CaretUpOutlined /></Button></div>
                            <div></div>
                            <div></div>

                            <div><Button onClick={() => moveCursor('l')}><CaretLeftOutlined /></Button></div>
                            <div></div>
                            <div><Button onClick={() => moveCursor('r')}><CaretRightOutlined /></Button></div>
                            <div></div>

                            <div></div>
                            <div><Button onClick={() => moveCursor('d')}><CaretDownOutlined /></Button></div>
                            <div></div>
                            <div><Button type="default" onClick={() => setEditorOpen(true)}>
                                Edit
                            </Button></div>
                        </div>



                    </div>
                    <div>
                        {/* <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-5 gap-4'>
                            <div></div>
                            <div>
                                <Controller
                                    control={control}
                                    name="posY"
                                    rules={{ required: true, min: 0, max: props.columns - 1 }}
                                    render={({ field, fieldState }) =>
                                        <>
                                            <Input type='number' placeholder="Cell Y" allowClear {...field} />
                                        </>} />
                            </div>
                            <div>
                                <Controller
                                    control={control}
                                    name="posX"
                                    rules={{ required: true, min: 0, max: props.columns - 1 }}
                                    render={({ field, fieldState }) =>
                                        <>
                                            <Input type='number' placeholder="Cell X" allowClear {...field} />
                                        </>}
                                />
                            </div>
                            <div className='grid grid-cols-2'>
                                <Button type="primary" htmlType="submit">
                                    Change
                                </Button>

                            </div>
                        </div>
                    </form> */}
                    </div>

                </div>
                <div>

                    <CellEditor
                        open={isEditorOpen}
                        cell={level.grid ? level.grid[activeCell.posY][activeCell.posX] : newCell}
                        onCancel={() => setEditorOpen(false)}
                        onSaveChanges={(cell?) => { editCell(cell!) }} />
                </div>
                <div className="overflow-auto flex justify-center mt-8" >
                    <Stage width={dimensions.w} height={dimensions.h} options={{ backgroundColor: "#ffffff" }}>
                        {level.grid.map((line, indexY) => {
                            return (
                                line.map((cell, indexX) => {
                                    let coords = twoDToIso({ posX: indexX * TILE_SIZE, posY: indexY * TILE_SIZE })
                                    return (
                                        cell.tileCode.map((tile, i) => {
                                            return (
                                                <Sprite
                                                    key={indexX + ' ' + indexY + ' ' + tile.posZ}
                                                    image={getTile(tile)}
                                                    width={32}
                                                    height={32}
                                                    x={coords.posX + dimensions.w / 2 - TILE_SIZE}
                                                    y={coords.posY - tile.posZ * 2} />)
                                        }
                                        ))
                                })
                            )

                        })}
                        <Sprite
                            image={getCursor()}
                            width={32}
                            height={32}
                            x={twoDToIso({ posX: activeCell.posX * TILE_SIZE, posY: activeCell.posY * TILE_SIZE }).posX + dimensions.w / 2 - TILE_SIZE}
                            y={twoDToIso({ posX: activeCell.posX * TILE_SIZE, posY: activeCell.posY * TILE_SIZE }).posY} />
                    </Stage>
                </div>
            </div >
        </div>
    );
}
