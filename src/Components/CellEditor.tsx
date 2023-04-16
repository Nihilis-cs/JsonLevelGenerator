import * as React from 'react';
import { IsoCell, TileSet } from '../Types/level.types';
import { Button, Checkbox, Input, Modal, Select } from 'antd';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import dictionary from '../Dictionary/tiles.dico';


export interface ICellEditorProps {
  open: boolean
  cell: IsoCell;
  onSaveChanges: (cell?: IsoCell) => void;
  onCancel: () => void;

}

export function CellEditor({ cell, open, onSaveChanges, onCancel }: ICellEditorProps) {
  const { control, register, handleSubmit, formState, reset, watch} = useForm<IsoCell>({
    defaultValues: {
      content: cell.content,
      contentAlt: cell.contentAlt,
      heightPixels: cell.heightPixels,
      isWalkable: cell.isWalkable,
      tileCode: cell.tileCode
    }
  });
  const newTileCode: TileSet = { tileCode: 11, posZ: 0, height: 0 }
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "tileCode",
  });

  const getTitle = () => {
    var vTitle: string = "Edit cell"
    return vTitle;
  }

  const handleCancel = () => {
    reset();
    onCancel();
  }

  const onSubmit = (data: IsoCell) => {
    console.log("cell before:");
    console.log(cell);

    data.content = cell.content;
    data.contentAlt = cell.contentAlt;
    for (let i = 0; i < data.tileCode.length; i++) {
      //data.tileCode[i] = dictionary[data.tileCode[i].tileCode]
      data.heightPixels += data.tileCode[i].height;
    }

    var vCell = data;
    console.log(vCell);
    reset();
    onSaveChanges(vCell);
  }

  return (
    <Modal open={open} closable={true} title={getTitle()} onCancel={handleCancel} onOk={handleSubmit(onSubmit)}>
      <div className='h-80'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button onClick={() => { append(newTileCode) }} >+</Button>
          <Button onClick={() => { remove(cell.tileCode.length) }} >-</Button>
          <div className='grid grid-cols-3'>
            <div>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <section className={"section"} key={field.id}>
                    <div className='grid grid-cols-3'>
                      <input
                        placeholder='TileCode'
                        defaultValue={index < cell.tileCode.length ? cell.tileCode[index].tileCode : 8}
                        {...register(`tileCode.${index}.tileCode` as const)}
                      />
                      <input
                        placeholder="PosZ"
                        defaultValue={index < cell.tileCode.length ? cell.tileCode[index].posZ : 0}
                        {...register(`tileCode.${index}.posZ` as const)}
                      />
                      {(index < cell.tileCode.length) &&
                        <img src={'../../tiles/' + field.tileCode + '.png'} width={32} height={32}/>
                      }
                    </div>
                  </section>
                </div>
              ))}
            </div>
            <div></div>
            <div>
              <div className='grid grid-cols-2'>
                <span className='text-center'> Is Walkable:</span>
                <Controller
                  control={control}
                  name="isWalkable"
                  render={({ field: { value, onChange }, fieldState }) =>
                    <>
                      <Checkbox {...register(`isWalkable`)} />
                    </>
                  }
                />
              </div>
              <div>
              </div>
              <Button type='default' onClick={handleSubmit(onSubmit)}>Submit</Button>
            </div>
          </div>
        </form>
      </div >
    </Modal >
  );
}
