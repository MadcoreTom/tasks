import * as React from "react";
import { useDispatch } from "react-redux";
import { addTask, exportGraph, sort } from "../state/store";

export function Panel() {
    const dispatch = useDispatch();
    return <div className="box bottom-panel">
        <div className="buttons">
            <button className="button is-white" style={{ fontWeight: "bold" }}>Tasks</button>
            <button className="button is-info" onClick={() => dispatch(exportGraph())}>Export</button>
            <button className="button is-info" onClick={() => dispatch(sort())}>Sort</button>
            <button className="button is-success" onClick={() => dispatch(addTask())}>Add Task</button>
        </div>
    </div>
}