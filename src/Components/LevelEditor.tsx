import * as React from 'react';
import { useEffect, useState } from 'react';
import { Content, ContentAlt, Coords, IsoCell, Level, TileSet } from '../Types/level.types';
import { Container, Sprite, Stage } from '@pixi/react';
import { CellEditor } from './CellEditor';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input } from 'antd';
import { CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined, CaretUpOutlined } from '@ant-design/icons';
import { ContentEditor } from './ContentEditor';
import texturesDico from '../Dictionary/text.dico';
import { ContentAltEditor } from './ContentAltEditor';




export interface ILevelEditorTableProps {
    lines: number;
    columns: number;
}

export type Dimensions = {
    w: number;
    h: number;
}


export function LevelEditor(props: ILevelEditorTableProps) {
    const newCell = { tileCode: [{ tileCode: 8, posZ: 0, height: 0 }], heightPixels: 0, isWalkable: true, content: [], contentAlt: [] }
    const [level, setLevel] = useState<Level>({ grid: [[newCell]] });
    const [activeCell, setActiveCell] = useState<Coords>({ posX: 0, posY: 0 });
    const [copiedCell, setCopiedCell] = useState<Coords>({ posX: 0, posY: 0 });
    const TILE_SIZE: number = 16;
    const [dimensions, setDimensions] = useState<Dimensions>({ w: 1248, h: 800 })
    const [isEditorOpen, setEditorOpen] = useState<boolean>(false);
    const [isContentOpen, setContentOpen] = useState<boolean>(false);
    const [isContentAltOpen, setContentAltOpen] = useState<boolean>(false);

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
                vLevel.grid[yy][xx] = { tileCode: [{ tileCode: 8, posZ: 0, height: 0 }], heightPixels: 0, isWalkable: true, content: [], contentAlt: [] };
            }

        }
        setDimensions({ w: props.lines * 2 * TILE_SIZE * 2 + TILE_SIZE * 2, h: props.columns * 1.5 * TILE_SIZE + TILE_SIZE * 2 });
        setLevel(vLevel);
    }, [props.lines, props.columns]);

    const moveCursor = (dir: string) => {
        if (dir === 'r' && activeCell.posX < props.lines - 1) {
            setActiveCell({ posX: activeCell.posX + 1, posY: activeCell.posY })
        }
        if (dir === 'l' && activeCell.posX > 0) {
            setActiveCell({ posX: activeCell.posX - 1, posY: activeCell.posY })
        }
        if (dir === 'u' && activeCell.posY > 0) {
            setActiveCell({ posX: activeCell.posX, posY: activeCell.posY - 1 })
        }
        if (dir === 'd' && activeCell.posY < props.columns - 1) {
            setActiveCell({ posX: activeCell.posX, posY: activeCell.posY + 1 })
        }
    }

    const getContent = (index: number) => {
        const img = new Image();
        img.src = '../../decor/decor' + index + '.png';
        return img;
    }
    const getCursor = () => {
        const img = new Image();
        img.src = "../../gui/cursor.png";
        return img;
    }

    const onSave = () => {
        var exportLevel = JSON.stringify(level);
        console.log(exportLevel);
    }

    const editCell = (cell: IsoCell) => {
        if (cell != undefined) {
            var vLevel = level;
            vLevel.grid[activeCell.posY][activeCell.posX] = cell;
            setLevel(vLevel);
        }
        setEditorOpen(false);
    }
    const editContent = (content: Content) => {
        var vCell = level.grid[activeCell.posY][activeCell.posX];
        vCell.content = [];
        content.posZ = vCell.heightPixels;
        vCell.content.push(content);
        var vLevel = level;
        vLevel.grid[activeCell.posY][activeCell.posX] = vCell;
        setLevel(vLevel);
        setContentOpen(false);
    }
    const emptyContent = () => {
        var vCell = level.grid[activeCell.posY][activeCell.posX];
        vCell.content = [];
        var vLevel = level;
        vLevel.grid[activeCell.posY][activeCell.posX] = vCell;
        setLevel(vLevel);
        setContentOpen(false);
    }
    const editContentAlt =(content: ContentAlt) =>
    {
        var vCell = level.grid[activeCell.posY][activeCell.posX];
        vCell.contentAlt = [content];
        var vLevel = level;
        vLevel.grid[activeCell.posY][activeCell.posX] = vCell;
        setLevel(vLevel);
        setContentAltOpen(false);
    }
    const emptyContentAlt = () => {
        var vCell = level.grid[activeCell.posY][activeCell.posX];
        vCell.contentAlt = [];
        var vLevel = level;
        vLevel.grid[activeCell.posY][activeCell.posX] = vCell;
        setLevel(vLevel);
        setContentAltOpen(false);
    }

    const copy = () => {
        setCopiedCell(activeCell);
        console.log(level.grid[copiedCell.posY][copiedCell.posX])
    }

    const paste = () => {
        if (copiedCell != undefined) {
            var vCell = level.grid[copiedCell.posY][copiedCell.posX];
            var vNewCell: IsoCell = { content: vCell.content, contentAlt: vCell.contentAlt, heightPixels: vCell.heightPixels, isWalkable: vCell.isWalkable, tileCode: []}
            vCell.tileCode.forEach(tile => {
                vNewCell.tileCode.push(tile);
            });
            editCell(vNewCell);
        }
    }
    return (
        <div>
            <div className=''>
                <div>
                    <div className='grid grid-cols-5'>
                        <div className="grid grid-cols-3">
                            <div></div>
                            <div className="mx-auto"><Button onClick={() => moveCursor('u')}><CaretUpOutlined /></Button></div>
                            <div></div>

                            <div className="flex"><div className="flex-grow"></div><Button onClick={() => moveCursor('l')}><CaretLeftOutlined /></Button></div>
                            <div className="text-center m-1">{activeCell.posX}, {activeCell.posY}</div>
                            <div className="flex"><Button onClick={() => moveCursor('r')}><CaretRightOutlined /></Button><div className="flex-grow"></div></div>

                            <div></div>
                            <div className="mx-auto"><Button onClick={() => moveCursor('d')}><CaretDownOutlined /></Button></div>
                            <div></div>
                        </div>
                        <div className="">
                            <div className='w-32 col-span-2'><Button type="default" block onClick={() => setContentOpen(true)}>
                                Add Content
                            </Button></div>
                            <div className='w-32 col-span-2'><Button type="default" block onClick={() => setContentAltOpen(true)}>
                                Add Content Alt
                            </Button></div>
                            <div className="col-span-2"></div>
                            <div className='w-32 col-span-2'><Button type="default" block onClick={() => setEditorOpen(true)}>
                                Edit
                            </Button></div>
                            <div className="col-span-2"></div>
                        </div>
                        <div>
                            <div className='w-32 col-span-2'><Button type="default" block onClick={() => copy()}>
                                Copy Cell {copiedCell?.posX}, {copiedCell?.posY}
                            </Button></div>
                            <div className='w-32 col-span-2'><Button type="default" block onClick={() => paste()}>
                                Paste Cell
                            </Button></div>
                        </div>
                        <div></div>
                        <div><div className='w-32 col-span-2'><Button type="default" block onClick={onSave}>Save Level</Button></div></div>
                    </div>
                    <div></div>
                </div>
                <div>
                    <CellEditor
                        open={isEditorOpen}
                        cell={level.grid[activeCell.posY][activeCell.posX]}
                        onCancel={() => setEditorOpen(false)}
                        onSaveChanges={(cell?) => { editCell(cell!) }} />

                    <ContentEditor 
                        cell={level.grid[activeCell.posY][activeCell.posX]}
                        coords={activeCell}
                        open={isContentOpen}
                        onSaveChanges={(content) => editContent(content)}
                        onCancel={() => setContentOpen(false)}
                        emptyContent={() => emptyContent()}
                    />
                    <ContentAltEditor
                        cell={level.grid[activeCell.posY][activeCell.posX]}
                        coords={activeCell}
                        open={isContentAltOpen}
                        onSaveChanges={(content) => editContentAlt(content)}
                        onCancel={() => setContentAltOpen(false)}
                        emptyContentAlt={() => emptyContentAlt()}
                    />
                </div>
                <div className="overflow-auto flex justify-center mt-8" >
                    <Stage width={dimensions.w} height={dimensions.h} options={{ backgroundColor: "#ffffff" }}>
                        {level.grid.map((line, indexY) => {
                            return (
                                line.map((cell, indexX) => {
                                    let coords = twoDToIso({ posX: indexX * TILE_SIZE, posY: indexY * TILE_SIZE })
                                    return (
                                        <>
                                            <Container position={[0, 0]}>
                                                {cell.tileCode.map((tile) => {
                                                    return (
                                                        <Sprite
                                                            key={indexX + ' ' + indexY + ' ' + tile.posZ}
                                                            image={texturesDico[tile.tileCode]}
                                                            width={32}
                                                            height={32}
                                                            x={coords.posX + dimensions.w / 2 - TILE_SIZE}
                                                            y={coords.posY + TILE_SIZE - (tile.posZ * 2)} />)
                                                }
                                                )}
                                            {/* </Container>
                                            <Container position={[0, 0]}> */}
                                                {cell.content.length != 0 &&
                                                    <Sprite
                                                        key={indexX + ' ' + indexY + ' ' + cell.content[0].posZ}
                                                        image={getContent(cell.content[0].image_index)}
                                                        width={96}
                                                        height={96}
                                                        x={coords.posX + dimensions.w / 2 - TILE_SIZE}
                                                        y={coords.posY + TILE_SIZE - (cell.content[0].posZ * 2)}
                                                        anchor={{ x: 0.33, y: 0.71 }} />
                                                }
                                                {cell.contentAlt.length != 0 &&
                                                    <Sprite
                                                        key={indexX + ' ' + indexY + ' ' + cell.contentAlt[0].tileCode[0].tileCode}
                                                        image={texturesDico[cell.contentAlt[0].tileCode[0].tileCode]}
                                                        width={32}
                                                        height={32}
                                                        x={coords.posX + dimensions.w / 2 - TILE_SIZE}
                                                        y={coords.posY + TILE_SIZE - (cell.contentAlt[0].heightPixels * 2)}
                                                        />
                                                }
                                            </Container>
                                        </>
                                    )
                                })
                            )
                        })}
                        <Container position={[0, 0]}>
                            <Sprite
                                image={getCursor()}
                                width={32}
                                height={32}
                                x={twoDToIso({ posX: activeCell.posX * TILE_SIZE, posY: activeCell.posY * TILE_SIZE }).posX + dimensions.w / 2 - TILE_SIZE}
                                y={twoDToIso({ posX: activeCell.posX * TILE_SIZE, posY: activeCell.posY * TILE_SIZE }).posY + TILE_SIZE - level.grid[activeCell.posY][activeCell.posX].heightPixels*2} />
                        </Container>
                    </Stage>
                </div>
            </div >
        </div>
    );
}

