import { useForm, Controller } from 'react-hook-form';
import LevelEditor, { LevelEditorParams } from './LevelEditor';
import { Button, Input } from 'antd';
import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function LevelParametor() {
    const navigate = useNavigate();
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [levelData, setLevelData] = useState<LevelEditorParams>({lines: 0, columns: 0, isInitializedProp: false});
    const { control, handleSubmit, formState } = useForm<LevelEditorParams>();
    const onSubmit = (data: LevelEditorParams) => {
        setIsInitialized(true);
        setLevelData(data);
        console.log(data);
    }

    return (
        <div>
            <div>
                <span className='text-2xl'>Level Parameters</span>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-3 gap-4'>
                        <div>
                            <Controller
                                control={control}
                                name="columns"
                                rules={{ required: true, min: 0, max: 400 }}
                                render={({ field, fieldState }) =>
                                    <>
                                        <Input type='number' placeholder="Number of columns" allowClear {...field} />
                                        {fieldState.error && <div>{fieldState.error.message}</div>}
                                    </>}
                            />
                        </div>
                        <div>
                            <Controller
                                control={control}
                                name="lines"
                                rules={{ required: true, min: 0, max: 400 }}
                                render={({ field, fieldState }) =>
                                    <>
                                        <Input type='number' placeholder="Number of lines" allowClear {...field} />
                                        {fieldState.error && <div>{fieldState.error.message}</div>}
                                    </>}
                            />
                        </div>
                        <div>
                            {formState.isValid &&
                                <Button type="primary" htmlType="submit">
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
            </div>
            {isInitialized &&
                <div>
                    <LevelEditor params={{
                        lines: levelData.lines,
                        columns: levelData.columns,
                        isInitializedProp: true
                    }}></LevelEditor>
                </div>}


        </div>
    );


}

export default LevelParametor;
