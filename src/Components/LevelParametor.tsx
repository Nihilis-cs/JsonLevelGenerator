import { useForm, Controller } from 'react-hook-form';
import LevelEditor, { IsoCell, Level, LevelEditorParams } from './LevelEditor';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { LevelEditorTable } from './LevelEditorTable';


function LevelParametor() {
    //const navigate = useNavigate();
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [levelData, setLevelData] = useState<LevelEditorParams | undefined>();
    const { control, handleSubmit, formState } = useForm<LevelEditorParams>();

    const onSubmit = (data: LevelEditorParams) => {
        setLevelData(data);
        console.log(levelData);
        setIsInitialized(true);
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
                    {/* <LevelEditorTable lines={levelData.lines} columns={levelData.columns}></LevelEditorTable> */}
                    {/* <LevelEditor params={{
                        lines: levelData.lines,
                        columns: levelData.columns,
                        isInitializedProp: true
                    }} level={level}></LevelEditor> */}
                </div>}


        </div>
    );


}

export default LevelParametor;
