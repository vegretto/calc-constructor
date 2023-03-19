import React from 'react';
import {useDrag} from "react-dnd";
import {ItemTypes} from "../../components/App/App";

const withDrag = (Component: React.FC) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.SCREEN,
        item: {id: 0, name: 'screen'},
        collect: (monitor => ({
            isDragging: monitor.isDragging()
        })),
    }))

    return (
        <div>
            ;
        </div>
    );
};

export default withDrag;