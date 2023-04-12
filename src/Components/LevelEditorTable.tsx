import * as React from 'react';
import { useEffect, useState } from 'react';
import { Level } from '../Types/level.types';

export interface ILevelEditorTableProps {
    lines: number;
    columns: number;
}

export function LevelEditorTable (props: ILevelEditorTableProps) {
    const newCell = { tileCode: [{ tileCode: 1, posZ: 0 }], heightPixels: 0, isWalkable: true, content: [], contentAlt: [] }
    const level: Level = {grid: []};
    useEffect(() => {
        for (let yy = 0; yy < props.columns; yy++) {
            for (let xx = 0; xx < props.lines; xx++) {
                level.grid[yy][xx] = newCell;
            }
            
        }
        console.log(props);
        console.log(level.grid);
    }, [props.lines, props.columns] );
    
  return (
    <div>
      
    </div>
  );
}
