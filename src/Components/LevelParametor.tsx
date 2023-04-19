import { useForm, Controller } from 'react-hook-form';

import { Button, Divider, Input } from 'antd';
import { useState } from 'react';
import { LevelEditor } from './LevelEditor';
import { LevelEditorParams } from '../Types/level.types';


function LevelParametor() {
    //const navigate = useNavigate();
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [levelData, setLevelData] = useState<LevelEditorParams>();
    const { control, handleSubmit, formState } = useForm<LevelEditorParams>();

    const onSubmit = (data: LevelEditorParams) => {
        setLevelData(data);
        console.log(levelData);
        setIsInitialized(true);
    }

    return (
        <div>
            <div className="mb-8">
                <div className='text-2xl mb-2'>Level Parameters</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='grid grid-cols-2'>
                            <div className="text-xl text-right mr-4">Length of columns:</div>
                            <Controller
                                control={control}
                                name="lines"
                                rules={{ required: true, min: 0, max: 400 }}
                                render={({ field, fieldState }) =>
                                    <>
                                        <input className="form-input rounded-lg border-0 h-8" type='number' {...field} />
                                    </>}
                            />
                        </div>
                        <div className='grid grid-cols-2'>
                            <div className="text-xl text-right mr-4">Length of lines:</div>
                            <Controller
                                control={control}
                                name="columns"
                                rules={{ required: true, min: 0, max: 400 }}
                                render={({ field, fieldState }) =>
                                    <>
                                        <input className="form-input rounded-lg border-0 h-8" type='number' {...field} />
                                        {fieldState.error && <div>{fieldState.error.message}</div>}
                                    </>}
                            />
                        </div>
                        <div>
                            {formState.isValid &&
                                <Button type="default" htmlType="submit">
                                    Submit
                                </Button>
                            }
                            {!formState.isValid &&
                                <Button type="dashed" disabled htmlType="submit">
                                    Submit
                                </Button>}
                        </div>

                    </div>
                </form>
                <Divider></Divider>
            </div >
            {isInitialized &&
                <div>
                    <LevelEditor lines={levelData?.lines ?? 0} columns={levelData?.columns ?? 0}></LevelEditor>
                </div>
            }


        </div>
    );


}

export default LevelParametor;
