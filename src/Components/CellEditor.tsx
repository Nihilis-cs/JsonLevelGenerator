import * as React from 'react';
import { Coords, IsoCell } from './LevelEditor';

export interface ICellEditorProps {
  cell: IsoCell;

}

export function CellEditor({ cell }: ICellEditorProps) {

  //TODO form
  return (
    <div>
      <div>
        <span>ActiveCell</span>
        <div className='grid grid-cols-4'>
          <div className=''>
            <span> Tile code: </span> 
            {cell.tileCode.map((item, index) => { return <span key={index}> {item.tileCode}, {item.posZ} </span> })}
          </div>
          <div className=''>
            <span> Tile code: </span> 
            <span>{cell.heightPixels }</span>
          </div>
          <div className=''>
            <span> Content: </span> 
            {cell.content.map((item, index) => { return <span key={index}> {item.sprite_index}</span> })}
          </div>
          
        </div>
      </div>
    </div>
  );
}
