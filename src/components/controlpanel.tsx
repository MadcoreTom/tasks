import * as React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addTask, exportGraph, RootState, sort } from "../state/store";
import { DependencyControls } from "./dependency.controls";
import { TaskControls } from "./task.controls";


export function ControlPanel() {
    const selected = useSelector((state: RootState) => state.main.selected)
    const selectedText = selected ? selected.type : "nothing";
    const dispatch = useDispatch();

    let editor: any = null;
    if (selected && selected.type == "task") {
        editor = <TaskControls />
    } else if(selected && selected.type == "dependency"){
        editor = <DependencyControls/>
    }

    return <div>
        <h3>Control Panel</h3>
        <p>Selected {selectedText}</p>
        {editor}
        <hr />
        <button onClick={() => dispatch(exportGraph())}>Export</button>
        <button onClick={() => dispatch(sort())}>Sort</button>
        <button onClick={() => dispatch(addTask())}>Add Task</button>
    </div>
}