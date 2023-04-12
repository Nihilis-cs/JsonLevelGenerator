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
    contentAlt: ContentAlt[];
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