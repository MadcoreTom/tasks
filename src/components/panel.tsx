import { AnyAction } from "@reduxjs/toolkit";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, exportGraph, importGraph, RootState, setTitle, setViewMode, sort } from "../state/store";
import { ButtonIcon } from "./bulma";
import { SaveModal } from "./save";

export function Panel() {
    const dispatch = useDispatch();
    const title = useSelector((state : RootState) => state.main.title);
    const viewMode = useSelector((state : RootState) => state.main.viewMode);
    const [showSaveModal, setSaveModal] = React.useState(false);

    return <div className="box bottom-panel">
        <div className="buttons">
            <button className="button is-white app-name is-small">Tasks</button>
            <input className="input" type="text" value={title} onChange={evt => dispatch(setTitle(evt.target.value))} style={{marginBottom:"0.5rem", marginRight:"0.5rem", width:"150px"}} />
            <ButtonIcon text="Save/Load" buttonClass="is-info is-outlined" iconCode={'\uE804'} onClick={() => setSaveModal(true)} />
            <ButtonIcon text="Sort" buttonClass="is-info is-outlined" iconCode={'\uF15D'} onClick={() => dispatch(sort())} />
            <ButtonIcon text="Add Task" buttonClass="is-success" iconCode={'\uE800'} onClick={() => dispatch(addTask())} />
            <button className="button is-outlined" onClick={() => dispatch(setViewMode(viewMode == 'graph' ? "table" : "graph"))} >To {viewMode == 'graph' ? "Table" : "Graph"} Mode</button>
        </div>
        {showSaveModal ? <SaveModal onClose={() => setSaveModal(false)} /> : null}
    </div>
}