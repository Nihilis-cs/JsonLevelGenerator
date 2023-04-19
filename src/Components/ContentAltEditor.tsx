import * as React from 'react';
import { Content, ContentAlt, Coords, IsoCell } from '../Types/level.types';
import { Button, Checkbox, Input, Modal } from 'antd';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import contentDico from '../Dictionary/content.dico';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import dictionary from '../Dictionary/tiles.dico';

export interface IContentAltEditorProps {
    cell: IsoCell;
    coords: Coords;
    open: boolean;
    onSaveChanges: (content: ContentAlt) => void;
    onCancel: () => void;
    emptyContentAlt: () => void;
}


export function ContentAltEditor({ cell, coords, open, onSaveChanges, onCancel, emptyContentAlt }: IContentAltEditorProps) {
    const { control, handleSubmit, watch, register } = useForm<ContentAlt>();

    const watcher = watch("tileCode");

    const onSubmit = (data: ContentAlt) => {
        var vContent: ContentAlt = {
            content: [],
            heightPixels: data.heightPixels,
            isWalkable: data.isWalkable,
            tileCode: data.tileCode,
        };
        onSaveChanges(vContent);
    }


    return (
        <Modal
            open={open}
            closable={false}
            title="Edit ContentAlt"
            onCancel={onCancel}
            onOk={handleSubmit(onSubmit)}
            footer={
                <>
                    <Button onClick={() => emptyContentAlt()}>Delete ContentAlt</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={handleSubmit(onSubmit)}>Ok</Button>
                </>}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2'>
                    <div className="overflow-auto">
                        <Controller
                            name="tileCode.0.tileCode"
                            control={control}
                            render={({ field, fieldState }) =>
                                <div className='flex flex-col px-auto'>
                                    <div className=' flex flex-row flex-grow mb-4'>
                                        <div className='flex-grow'></div>
                                        <img src={'../../tiles/' + watcher[0].tileCode + '.png'} width={96} height={96} />
                                        <div className='flex-grow'></div>
                                    </div>
                                    <Input type='number' min={1} max={dictionary.length} {...field} />

                                </div>
                            }
                        />
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
                            <span className='text-center'> Height:</span>
                            <Controller
                                control={control}
                                name="heightPixels"
                                render={({ field: { value, onChange }, fieldState }) =>
                                    <>
                                        <input type="number" {...register(`heightPixels`)} />
                                    </>
                                }
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Modal >
    );
}
