import * as React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../state/store";
import { DependencyControls } from "./dependency.controls";
import { TaskControls } from "./task.controls";
import { select } from "../state/store";
import { ButtonIcon } from "./bulma";
import { Box } from "@primer/react";


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

    const title = selected ? <span>{selected.type}<ButtonIcon buttonClass="is-light is-small" iconCode={"\uE808"} onClick={()=>dispatch(select(null))}float="right"/></span> : "Control Panel"

    return <Box className="control-panel" sx={{p:2}}>
        <p className="title is-4" style={{textTransform:"capitalize"}}>{title}</p>
        {editor}
    </Box>
}