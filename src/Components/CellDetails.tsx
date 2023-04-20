import { Card, Divider } from 'antd';
import texturesDico from '../Dictionary/text.dico';
import dictionary from '../Dictionary/tiles.dico';
import { IsoCell } from '../Types/level.types';


export interface ICellDetailsProps {
    cell?: IsoCell;
}

export function CellDetails({ cell }: ICellDetailsProps) {
    if (cell == undefined) {
        return (<></>);
    }
    else {

        return (
            <Card className="h-full" title="Cell Details">
                <div className="grid grid-cols-2">
                    <div>
                        {cell && cell.tileCode.map((item, index) => {
                            return (
                            <div className='grid grid-cols-2' key={item.tileCode + index}>
                                <img src={"../../tiles/" + item.tileCode + ".png"} width={32} height={32} />
                                <div>
                                    <span>Pos Z: </span>
                                    <span>{item.posZ} </span>
                                </div>
                                
                            </div>)
                        })}

                        {cell.contentAlt.length > 0 && cell.contentAlt[0].tileCode.map((item, index) => {
                            return <div key={item.tileCode + index}>
                                <img src={"../../tiles/" + item.tileCode + ".png"} width={32} height={32} />
                            </div>
                        })}
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="text-base mr-2">
                            Is Walkable:
                        </div>
                        <div className="text-base">
                            {cell?.isWalkable ? <span>yes</span> : <span>no</span>}
                        </div>
                        <div className="text-base mr-2">
                            Height:
                        </div>
                        <div className="text-base">
                            {cell?.heightPixels}
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}
