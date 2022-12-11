import { AnyAction } from "@reduxjs/toolkit";
import * as React from "react";
import { useDispatch } from "react-redux";
import { addTask, exportGraph, importGraph, sort } from "../state/store";

export function Panel() {
    const dispatch = useDispatch();
    return <div className="box bottom-panel">
        <div className="buttons">
            <button className="button is-white app-name is-small">Tasks</button>
            <button className="button is-info" onClick={() => dispatch(exportGraph())}>Download</button>

            <div className="file is-info">
                <label className="file-label">
                    <input className="file-input" type="file" name="resume" onChange={evt => loadFile(evt, data => dispatch(importGraph(data)))} />
                    <span className="file-cta">
                        <span className="file-label">
                            Upload
                        </span>
                    </span>
                </label>
            </div>

            <button className="button is-info" onClick={() => dispatch(sort())}>Sort</button>
            <button className="button is-success" onClick={() => dispatch(addTask())}>Add Task</button>
        </div>
    </div>
}

function loadFile(evt: React.ChangeEvent<HTMLInputElement>, callback: (data: string) => any) {
    if (evt.target.files) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            if (!evt.target || evt.target.readyState != 2) return;
            if (evt.target.error) {
                alert('Error while reading file');
                return;
            }
            if (evt.target.result) {
                callback(evt.target.result.toString());
            }
        };
        reader.readAsText(evt.target.files[0]);
    }
}