import { AnyAction } from "@reduxjs/toolkit";
import * as React from "react";
import { useDispatch } from "react-redux";
import { addTask, exportGraph, importGraph, sort } from "../state/store";
import { ButtonIcon } from "./bulma";
import { SaveModal } from "./save";

export function Panel() {
    const dispatch = useDispatch();
    const [showSaveModal, setSaveModal] = React.useState(false);

    return <div className="box bottom-panel">
        <div className="buttons">
            <button className="button is-white app-name is-small">Tasks</button>
            <ButtonIcon text="Save/Load" buttonClass="is-info is-outlined" iconCode={'\uE804'} onClick={() => setSaveModal(true)} />
            <ButtonIcon text="Sort" buttonClass="is-info is-outlined" iconCode={'\uF15D'} onClick={() => dispatch(sort())} />
            <ButtonIcon text="Add Task" buttonClass="is-success" iconCode={'\uE800'} onClick={() => dispatch(addTask())} />
        </div>
        {showSaveModal ? <SaveModal onClose={() => setSaveModal(false)} /> : null}
    </div>
}