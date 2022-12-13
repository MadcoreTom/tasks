import * as React from "react";
import { useSelector } from 'react-redux'
import { RootState } from "../state/store";
import { DependencyControls } from "./dependency.controls";
import { TaskControls } from "./task.controls";


export function ControlPanel() {
    const selected = useSelector((state: RootState) => state.main.selected)
    const selectedType = selected ? <span style={{ color: '#48c78e', fontSize: "60%" }}>: {selected.type}</span> : null;

    let editor: any = null;
    if (selected && selected.type == "task") {
        editor = <TaskControls />
    } else if (selected && selected.type == "dependency") {
        editor = <DependencyControls />
    } else {
        editor = <p>Click a task or dependency to modify it here</p>
    }

    return <div className="box control-panel">
        <p className="title is-4">Control Panel{selectedType}</p>
        {editor}
    </div>
}