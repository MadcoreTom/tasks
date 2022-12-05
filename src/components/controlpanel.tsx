import * as React from "react";
import { useSelector } from 'react-redux'
import { TaskControls } from "./task.controls";


export function ControlPanel() {
    const selected = useSelector(state => state.main.selected)
    const selectedText = selected ? JSON.stringify(selected) : "nothing";

    let editor:any = null;
    if(selected && selected.type == "task"){
        editor = <TaskControls/>
    }

    return <div>
        <h3>Control Panel</h3>
        <p>Selected {selectedText}</p>
        {editor}
        <hr/>
        <button>Export</button>
    </div>
}