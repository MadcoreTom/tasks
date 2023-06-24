import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, exportGraph, RootState, setTitle, setViewMode, sort, updateSaveDialog } from "../state/store";
import { ButtonIcon } from "./bulma";
import { StatusesModal } from "./status.modal";
import { downloadSvg } from "../util/svg-to-image";
import { ImportButton } from "./import.button";



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
                        <a className="navbar-item" onClick={()=>dispatch(dispatch(updateSaveDialog({show:true,updateFiles:true})))}>
                        <span className="icon">
                            <i>{'\uE804'}</i>
                        </span>&nbsp;Save/Load in browser
                        </a>
                        <hr className="navbar-divider" />
                        <a className="navbar-item" onClick={() => dispatch(exportGraph())} >
                            <span className="icon">
                                <i>{'\uE802'}</i>
                            </span>
                            <span>
                                Export to file
                            </span>
                        </a>
                        <div className="navbar-item file is-white">
                            <ImportButton/>
                        </div>
                        <hr className="navbar-divider" />
                        <a className="navbar-item" onClick={() => downloadSvg(document.querySelector("svg#graph") as SVGSVGElement, title + ".png")} >
                            <span className="icon">
                                <i>{'\uF1C5'}</i>
                            </span>
                            <span>
                                Export as image (beta)
                            </span>
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
