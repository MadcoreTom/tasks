import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { importGraph, RootState, saveLocalGraph, setTitle, updateSaveDialog } from "../state/store";
import { Button, ButtonIcon, TextField } from "./bulma";
import { LOCAL_STORAGE } from "../util/local-storage";

export function BrowserSaveContainer() {
    const saveDialogState = useSelector((state: RootState) => state.main.saveDialog);
    const title = useSelector((state: RootState) => state.main.title);

    if (!saveDialogState.show) {
        return null;
    } else {
        return <BrowserSave initialName={title} files={saveDialogState.files} />
    }

}

function BrowserSave(props: { initialName: string, files: string[] }) {
    const [selected, setSelected] = React.useState(props.initialName);
    const dispatch = useDispatch();

    const files = props.files;

    const options = files.map((f, i) => {
        return <option value={f} key={i}>{f}</option>
    });

    const selectedInList = !!selected && files.indexOf(selected) >= 0;

    function close() {
        dispatch(updateSaveDialog({ show: false, updateFiles: false }));
    }

    function saveAs() {
        if (!selectedInList && selected != undefined && selected.length > 0) {
            dispatch(saveLocalGraph(selected));
            dispatch(updateSaveDialog({ show: true, updateFiles: true }));
            dispatch(setTitle(selected))
            close();
        }
    }

    
    function saveOver() {
        if (selectedInList) {
            dispatch(saveLocalGraph(selected));
            dispatch(updateSaveDialog({ show: true, updateFiles: true }));
            dispatch(setTitle(selected));
            close();
        }
    }

    function load() {
        if (selectedInList) {
            const data = LOCAL_STORAGE.loadFile(selected);
            dispatch(importGraph({ data, title: selected }));
            dispatch(updateSaveDialog({ show: true, updateFiles: true }));
            dispatch(setTitle(selected))
            close();
        }
    }

    function deleteSave() {
        if (selectedInList) {
            LOCAL_STORAGE.deleteFile(selected);
            dispatch(updateSaveDialog({ show: true, updateFiles: true }));
        }
    }

    return <div className="modal is-active">
        <div className="modal-background" onClick={close}></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Browser Storage</p>
                <button className="delete" aria-label="close" onClick={close} />
            </header>
            <section className="modal-card-body browser-storage">
                <div>Select existing file from the list, or enter a new name below:</div>
                <div className="select is-multiple">
                    <select multiple size={8} onChange={change => setSelected(change.target.value)} value={selectedInList ? [selected] : []}>
                        {options}
                    </select>
                </div>
                <TextField label="Name" value={"" + selected} onChange={value => setSelected(value)} />
                <div className="field is-grouped">
                    <p className="control">
                        <Button text="Load" buttonClass="is-info"  onClick={load} isDisabled={!selectedInList} />
                    </p>
                    <p className="control">
                        <Button text="Save Over" buttonClass="is-warning" onClick={saveOver} isDisabled={!selectedInList} />
                    </p>
                    <p className="control">
                        <Button text="Delete" buttonClass="is-danger" onClick={deleteSave} isDisabled={!selectedInList} />
                    </p>
                    <p className="control">
                        <Button text="Save As" buttonClass="is-info" onClick={saveAs} isDisabled={selectedInList || selected == undefined} />
                    </p>
                </div>
            </section>
        </div>
    </div>
}
