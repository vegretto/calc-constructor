import "./app.scss"
import Canvas from "../Canvas/Canvas";
import Sidebar from "../Sidebar/Sidebar";
import React from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const ItemTypes = {
    SCREEN: 'screen',
    PART: 'part'
}

const App = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={'mainWrapper'}>
                <Sidebar/>
                <Canvas />
            </div>
        </DndProvider>
    )
}

export default App;
