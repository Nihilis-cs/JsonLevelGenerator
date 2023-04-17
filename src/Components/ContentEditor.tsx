import * as React from 'react';
import { Content, Coords, IsoCell } from '../Types/level.types';
import { Input, Modal } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import contentDico from '../Dictionary/content.dico';

export interface IContentEditorProps {
    cell: IsoCell;
    coords: Coords;
    open: boolean;
    onSaveChanges: (content: Content) => void;
    onCancel: () => void;
}

type FormContent = {
    index: number;
}

export function ContentEditor({ cell, coords, open, onSaveChanges, onCancel }: IContentEditorProps) {
    const { control, handleSubmit, watch } = useForm<FormContent>({ defaultValues: { index: 1 } });
    const getDecor = (index: number) => {
        return (<img src={"../../decor/decor" + index + ".png"} />);
    }
    const watcher = watch(["index"]);
    const onSubmit = (data: FormContent) => {
        var vContent: Content = {
            image_index: data.index,
            image_xscale: 0,
            image_yscale: 0,
            positionGrid: coords,
            posZ: cell.heightPixels,
            sprite_index: "s_decor",
            x: 0,
            y: 0
        };
        onSaveChanges(vContent);
    }
    return (
        <Modal open={open} closable={false} title="Edit Content" onCancel={onCancel} onOk={handleSubmit(onSubmit)}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="index"
                    control={control}
                    render={({ field, fieldState }) =>
                        <div className='flex flex-col px-auto'>
                            <div className=' flex flex-row flex-grow mb-4'>
                                <div className='flex-grow'></div>
                                <img src={'../../decor/decor' + watcher + '.png'} width={96} height={96} />
                                <div className='flex-grow'></div>
                            </div>
                            <Input type='number' min={1} max={contentDico.length} {...field} />
                        </div>
                    }
                />
            </form>
        </Modal>
    );
}
