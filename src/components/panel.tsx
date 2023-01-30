import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, exportGraph, importGraph, RootState, setTitle, setViewMode, sort } from "../state/store";
import { ButtonIcon } from "./bulma";

function PanelOld() {
    const dispatch = useDispatch();
    const title = useSelector((state: RootState) => state.main.title);
    const viewMode = useSelector((state: RootState) => state.main.viewMode);
    const [showSaveModal, setSaveModal] = React.useState(false);

    return <div className="box bottom-panel">
        <div className="buttons">
            {/* <input className="input" type="text" value={title} onChange={evt => dispatch(setTitle(evt.target.value))} style={{ marginBottom: "0.5rem", marginRight: "0.5rem", width: "150px" }} /> */}
            {/* <ButtonIcon text="Save/Load" buttonClass="is-info is-outlined" iconCode={'\uE804'} onClick={() => setSaveModal(true)} /> */}
            <ButtonIcon text="Sort" buttonClass="is-info is-outlined" iconCode={'\uF15D'} onClick={() => dispatch(sort())} />
            {/* <ButtonIcon text="Add Task" buttonClass="is-success" iconCode={'\uE800'} onClick={() => dispatch(addTask())} /> */}
            {/* <button className="button is-outlined" onClick={() => dispatch(setViewMode(viewMode == 'graph' ? "table" : "graph"))} >To {viewMode == 'graph' ? "Table" : "Graph"} Mode</button> */}
        </div>
        {/* {showSaveModal ? <SaveModal onClose={() => setSaveModal(false)} /> : null} */}
    </div>
}

export function Panel(): any {
    const dispatch = useDispatch();
    const viewMode = useSelector((state: RootState) => state.main.viewMode);
    const title = useSelector((state: RootState) => state.main.title);
    const [showSaveModal, setSaveModal] = React.useState(false);
    const [isRenaming, setRenaming] = React.useState(false);

    let titleElem = <div className="navbar-item" onClick={() => setRenaming(true)} style={{ cursor: "cell" }}>"{title}"</div>;
    if (isRenaming) {
        titleElem = <div className="navbar-item">
            <input className="input" type="text" value={title} onChange={evt => dispatch(setTitle(evt.target.value))} style={{ width: "150px" }}
                onBlur={() => setRenaming(false)}
            />
        </div>;
    }

    return <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <h1 className="app-name">Tasks</h1>
        </div>
        <div className="navbar-menu">
            <div className="navbar-start">
                {titleElem}
                <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                        Edit
                    </a>
                    <div className="navbar-dropdown is-boxed">
                        <a className="navbar-item" onClick={() => setRenaming(true)} >
                            Rename
                        </a>
                        <a className="navbar-item" onClick={() => dispatch(sort())}>
                            <span className="icon">
                                <i>{'\uF15D'}</i>
                            </span>
                            <span>
                                Sort
                            </span>
                        </a>
                    </div>
                </div>
                <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                        Mode
                    </a>
                    <div className="navbar-dropdown is-boxed">
                        <a className={"navbar-item " + (viewMode == 'graph' ? 'is-active' : '')} onClick={() => dispatch(setViewMode('graph'))}>
                            Dependency Graph
                        </a>
                        <a className={"navbar-item " + (viewMode == 'table' ? 'is-active' : '')} onClick={() => dispatch(setViewMode('table'))}>
                            Table
                        </a>
                    </div>
                </div>
                <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                        <span className="icon">
                            <i>{'\uE804'}</i>
                        </span>
                    </a>
                    <div className="navbar-dropdown is-boxed">
                        <a className="navbar-item" onClick={() => dispatch(exportGraph())} >
                            <span className="icon">
                                <i>{'\uE802'}</i>
                            </span>
                            <span>
                                Download as file
                            </span>
                        </a>
                        <a className="navbar-item" style={{ textDecoration: "line-through" }}>
                            Save in browser
                        </a>
                        <hr className="navbar-divider" />
                        <div className="navbar-item file is-white">
                            <label className="file-label">
                                <input className="file-input" type="file" name="resume" onChange={evt => loadFile(evt, data => { dispatch(importGraph({ data, title: evt.target.files[0].name })); () => setSaveModal(false) })} />
                                <span className="file-cta">
                                    <span className="icon is-small">
                                        <i>{'\ue803'}</i>
                                    </span>
                                    <span className="file-label">
                                        &nbsp;Upload
                                    </span>
                                </span>
                            </label>
                        </div>
                        <a className="navbar-item" style={{ textDecoration: "line-through" }}>
                            Load from browser
                        </a>
                    </div>
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <ButtonIcon text="Add Task" buttonClass="is-success" iconCode={'\uE800'} onClick={() => dispatch(addTask())} />
                    </div>
                </div>
            </div>
        </div>
    </nav>
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