import * as React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../state/store";
import { DependencyControls } from "./dependency.controls";
import { TaskControls } from "./task.controls";
import { select } from "../state/store";


export function ControlPanel() {
    const selected = useSelector((state: RootState) => state.main.selected);
    const dispatch = useDispatch();
    // const selectedType = selected ? <span style={{ color: '#48c78e', fontSize: "60%" }}>: {selected.type}</span> : null;

    let editor: any = null;
    if (selected && selected.type == "task") {
        editor = <TaskControls />
    } else if (selected && selected.type == "dependency") {
        editor = <DependencyControls />
    } else if (selected && selected.type == "multi") {
        // TODO
        editor = <div>
            <p>Multi Select {selected.nodeIdx.join(", ")}</p>
        </div>
    } else {
        editor = <p>Click a task or dependency to modify it here</p>
    }

    const title = selected ? <span>{selected.type}<button className="button is-light is-small" onClick={()=>dispatch(select(null))} style={{float:"right"}}>✖</button></span> : "Control Panel"

    return <div className="box control-panel">
        <p className="title is-4" style={{textTransform:"capitalize"}}>{title}</p>
        {editor}
    </div>
}