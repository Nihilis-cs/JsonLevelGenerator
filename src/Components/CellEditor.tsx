import * as React from 'react';
import { IsoCell, TileSet } from '../Types/level.types';
import { Button, Checkbox, Input, Modal } from 'antd';
import { Controller, useFieldArray, useForm } from 'react-hook-form';


export interface ICellEditorProps {
  open: boolean
  cell: IsoCell;
  onSaveChanges: (cell?: IsoCell) => void;
  onCancel: () => void;

}

export function CellEditor({ cell, open, onSaveChanges, onCancel }: ICellEditorProps) {
  const { control, register, handleSubmit, formState, reset } = useForm<IsoCell>({
    defaultValues: {
      content: cell.content,
      contentAlt: cell.contentAlt,
      heightPixels: cell.heightPixels,
      isWalkable: cell.isWalkable,
      tileCode: cell.tileCode
    }
  });
  const newTileCode: TileSet = { tileCode: 11, posZ: 0 }
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "tileCode", // unique name for your Field Array
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
          <div className='grid grid-cols-3'>
            <div>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <section className={"section"} key={field.id}>
                    <div className='grid grid-cols-2'>
                      <span className='text-center'> TileCode[{index}]:</span>
                      <input
                        {...register(`tileCode.${index}.tileCode` as const)}
                      />
                    </div>
                    <div className='grid grid-cols-2'>
                      <span className='text-center'> PosZ[{index}]:</span>
                      <input
                        
                        {...register(`tileCode.${index}.posZ` as const)}
                      />
                    </div>
                  </section>
                </div>
              ))}
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
              <div className='grid grid-cols-2'>
                <span className='text-center'> Height:</span>
                <Controller
                  control={control}
                  name="heightPixels"
                  render={({ field: { value, onChange }, fieldState }) =>
                    <>
                      <Checkbox {...register(`heightPixels`)} />
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
