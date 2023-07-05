import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { importGraph, RootState, saveLocalGraph, setTitle, updateSaveDialog } from "../state/store";
import { LOCAL_STORAGE } from "../util/local-storage";
import { ImportButton } from "./import.button";
import { Box, Button, ButtonGroup, FormControl, Octicon, TextInput, TreeView } from "@primer/react";

export function BrowserSaveContainer() {
    const saveDialogState = useSelector((state: RootState) => state.main.saveDialog);
    const title = useSelector((state: RootState) => state.main.title);

    if (!saveDialogState.show) {
        return null;
    } else {
        return <BrowserSave initialName={title} files={saveDialogState.files} showNew={saveDialogState.showNew} />
    }

}

function BrowserSave(props: { initialName: string, files: string[], showNew: boolean }) {
    const [selected, setSelected] = React.useState(props.initialName);
    const dispatch = useDispatch();

    const files = props.files;
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

    let title:string;
    let newSection:JSX.Element | null = null;
    let saveLoadOptions:JSX.Element;
    let setName:JSX.Element | null = null;

    if (props.showNew) {
        title = "New";
        newSection = <NewDialog />
        saveLoadOptions = <ButtonGroup sx={{ p: 2 }}>
            <Button onClick={load} disabled={!selectedInList}>Load</Button>
        </ButtonGroup>
    } else {
        title = "Browser Storage";
        saveLoadOptions = <ButtonGroup sx={{ p: 2 }}>
            <Button onClick={load} disabled={!selectedInList} >Load</Button>
            <Button onClick={saveOver} disabled={!selectedInList}>Save</Button>
            <Button onClick={deleteSave} variant="danger" disabled={!selectedInList}>Delete</Button>
            <Button onClick={saveAs} disabled={selectedInList || selected == undefined}>Save As</Button>
        </ButtonGroup>
        setName = <FormControl sx={{ p: 2 }}>
            <FormControl.Label>Name</FormControl.Label>
            <TextInput value={"" + selected} onChange={evt => setSelected(evt.target.value)}  sx={{width: "100%"}} />
        </FormControl> 
    }


    return <div className="modal is-active">
        <div className="modal-background" onClick={close}></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">{title}</p>
                <button className="delete" aria-label="close" onClick={close} />
            </header>
            <div style={{ display: "flex" }}>
                {newSection}
                <section className="modal-card-body browser-storage" style={{ minWidth: 200, minHeight: 200 }}>
                    <FileList selected={selected} files={files} setSelected={setSelected} />
                    {setName}
                    {saveLoadOptions}
                </section>
            </div>
        </div>
    </div>
}

function NewDialog(props: {}): JSX.Element {
    const dispatch = useDispatch();

    return <section className="modal-card-body new-section">
        <p>Welcome!<br/>Create a new graph or open an existing one</p>
        <div className="field is-grouped">
            <p className="control">
                <Button variant="primary" onClick={() => dispatch(updateSaveDialog({ show: false, updateFiles: false }))} >New</Button>
            </p>
            <ImportButton/>
        </div>
    </section>
}

function FileList(props: { selected: string, files: string[], setSelected: (selected: string) => void }) {
    const { selected, files, setSelected } = props;
    const optionItems = files.map((f, i) => {
        return <TreeView.Item id={`file.${i}.${f}`} key={i}
            onSelect={() => setSelected(f)}
            current={f == selected}>
            <TreeView.LeadingVisual>
                {/* <FileIcon /> */}icon
            </TreeView.LeadingVisual>
            {f}
        </TreeView.Item>
    });

    return <Box sx={{ minWidth: 200, minHeight: 300, borderWidth: 1, borderStyle: 'solid', borderColor: 'border.default', p: 2 }}>
        <nav aria-label="Files">
            <TreeView aria-label="Files">
                <TreeView.Item id="files.root" expanded={true}>
                    <TreeView.LeadingVisual>
                        <TreeView.DirectoryIcon />
                    </TreeView.LeadingVisual>
                    Browser Storage
                    <TreeView.SubTree>
                        {optionItems}
                    </TreeView.SubTree>
                </TreeView.Item>
            </TreeView>
        </nav>
    </Box>
}