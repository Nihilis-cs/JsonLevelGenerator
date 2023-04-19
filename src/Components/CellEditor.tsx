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
  const { control, register, handleSubmit, formState, reset, watch } = useForm<IsoCell>({
    defaultValues: {
      content: cell.content,
      contentAlt: cell.contentAlt,
      heightPixels: cell.heightPixels,
      isWalkable: cell.isWalkable,
      tileCode: cell.tileCode
    }
  });
  const newTileCode: TileSet = { tileCode: 11, posZ: 0, height: 0 }
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tileCode",
  });
  const watchFieldArray = watch("tileCode");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    };
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
    var vHeightAt = 0;
    for (let i = 0; i < data.tileCode.length; i++) {
      data.tileCode[i].posZ = vHeightAt;
      vHeightAt += dictionary[data.tileCode[i].tileCode].height
    }
    data.heightPixels = vHeightAt;
    var vCell = data;
    console.log(vCell);
    reset();
    onSaveChanges(vCell);
  }

  return (
    <Modal open={open} closable={true} title={getTitle()} onCancel={handleCancel} onOk={handleSubmit(onSubmit)}>
      <div className='h-80'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 ">
            <Button onClick={() => { remove(cell.tileCode.length) }}>-</Button>
            <Button onClick={() => { append(newTileCode) }} >+</Button>

          </div>
          <div className='grid grid-cols-2'>
            <div className="overflow-auto">
              {controlledFields.map((field, index) => {
                return (
                  <div className='grid grid-cols-3 gap-4'>
                    <input type='number' {...register(`tileCode.${index}.tileCode` as const)} />
                    <img className="col-span-2" src={'../../tiles/' + field.tileCode + '.png'} width={32} height={32} />
                  </div>);
              })}

            </div>

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
            </div>
          </div>
        </form>
      </div >
    </Modal >
  );
}
