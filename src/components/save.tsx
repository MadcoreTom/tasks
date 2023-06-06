import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { exportGraph, importGraph, RootState, saveLocalGraph, setTitle, sort, updateSaveDialog } from "../state/store";
import { ButtonIcon, TextField } from "./bulma";
import { LOCAL_STORAGE } from "../util/local-storage";

export function BrowserSave() {
    const title = useSelector((state: RootState) => state.main.title);
    const [selected, setSelected] = React.useState(title);
    const dispatch = useDispatch();
    const saveDialogState = useSelector((state: RootState) => state.main.saveDialog);

    if (!saveDialogState.show) {
        return null;
    }
    const files = saveDialogState.files;

    const options = files.map((f, i) => {
        return <option value={f} key={i}>{f}</option>
    });

    const selectedInList = !!selected && files.indexOf(selected) >= 0;


    function saveAs() {
        if (!selectedInList && selected != undefined && selected.length > 0) {
            dispatch(saveLocalGraph(selected));
            dispatch(updateSaveDialog({ show: true, updateFiles: true }));
        }
    }

    function load() {
        if (selectedInList) {
            const data = LOCAL_STORAGE.loadFile(selected);
            dispatch(importGraph({ data, title: selected }));
            dispatch(updateSaveDialog({ show: true, updateFiles: true }));
        }
    }

    function deleteSave() {
        if (selectedInList) {
            LOCAL_STORAGE.deleteFile(selected);
            dispatch(updateSaveDialog({ show: true, updateFiles: true }));
        }
    }

    return <div className="modal is-active">
        <div className="modal-background" onClick={() => dispatch(updateSaveDialog({ show: false, updateFiles: false }))}></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Browser Storage</p>
                <button className="delete" aria-label="close" onClick={() => dispatch(updateSaveDialog({ show: false, updateFiles: false }))} />
            </header>
            <section className="modal-card-body browser-storage">
                <p>Feature still in testing</p>
                <div className="select is-multiple">
                    <select multiple size={8} onChange={change => setSelected(change.target.value)} value={selectedInList ? [selected] : []}>
                        {options}
                    </select>
                </div>
                <TextField label="Name" value={"" + selected} onChange={value => setSelected(value)} />
                <div className="field is-grouped">
                    <p className="control">
                        <ButtonIcon text="Load" buttonClass="is-info" iconCode={'\uE804'} onClick={load} isDisabled={!selectedInList} />
                    </p>
                    <p className="control">
                        <ButtonIcon text="Save Over" buttonClass="is-info" iconCode={'\uE804'} onClick={() => { }} isDisabled={!selectedInList} />
                    </p>
                    <p className="control">
                        <ButtonIcon text="Delete" buttonClass="is-danger" iconCode={'\uE804'} onClick={deleteSave} isDisabled={!selectedInList} />
                    </p>
                    <p className="control">
                        <ButtonIcon text="Save As" buttonClass="is-info" iconCode={'\uE804'} onClick={saveAs} isDisabled={selectedInList || selected == undefined} />
                    </p>
                </div>
            </section>
        </div>
    </div>
}
