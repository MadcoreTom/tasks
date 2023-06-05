import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, exportGraph, importGraph, RootState, setTitle, setViewMode, sort } from "../state/store";
import { ButtonIcon } from "./bulma";
import { StatusesModal } from "./status.modal";



export function Panel(): any {
    const dispatch = useDispatch();
    const viewMode = useSelector((state: RootState) => state.main.viewMode);
    const title = useSelector((state: RootState) => state.main.title);
    const [isRenaming, setRenaming] = React.useState(false);
    const [statusDialogOpen, setStatusDialogOpen] = React.useState(false);

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
                        <a className="navbar-item" onClick={() => setStatusDialogOpen(true)} >
                            Edit Statuses
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
                <div className="navbar-item">
                    <div className="buttons">
                        <ButtonIcon text="Feedback" buttonClass="is-dark" iconCode={'\uE807'} onClick={() => window.open('https://github.com/MadcoreTom/tasks/issues', '_blank').focus()} />
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
        {statusDialogOpen ? <StatusesModal onClose={() => setStatusDialogOpen(false)} /> : null}
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