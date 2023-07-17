import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, exportGraph, RootState, setTitle, setViewMode, sort, updateSaveDialog } from "../state/store";
import { StatusesModal } from "./status.modal";
import { downloadSvg } from "../util/svg-to-image";
import { ImportButton } from "./import.button";
import { Autosave } from "./autosave";
import { ActionList, ActionMenu, Button, Header, TextInput } from "@primer/react";
import { PlusCircleIcon } from "@primer/octicons-react";



export function HeaderBar(): any {
    const dispatch = useDispatch();
    const viewMode = useSelector((state: RootState) => state.main.viewMode);
    const title = useSelector((state: RootState) => state.main.title);
    const [statusDialogOpen, setStatusDialogOpen] = React.useState(false);

    return <Header>
        <Header.Item>
            <Header.Item>
                <span className="app-name">Tasks</span>
            </Header.Item>
        </Header.Item>
        <Header.Item full></Header.Item>
        <HeaderFileName title={title} setTitle={t => dispatch(setTitle(t))} />
        <Header.Item full></Header.Item>
        <Header.Item>
            <ActionMenu>
                <ActionMenu.Button>Menu</ActionMenu.Button>
                <ActionMenu.Overlay>
                    <ActionList>
                        <ActionList.Item onSelect={() => setStatusDialogOpen(true)}>Edit Statuses</ActionList.Item>
                        <ActionList.Item onSelect={() => dispatch(sort())}>Sort</ActionList.Item>
                        <ActionList.Divider />
                        <ActionList.Group title="View" selectionVariant="single">
                            <ActionList.Item selected={viewMode == 'graph'} onSelect={() => dispatch(setViewMode('graph'))}>
                                Dependency Graph
                            </ActionList.Item>
                            <ActionList.Item selected={viewMode == 'table'} onSelect={() => dispatch(setViewMode('table'))}>
                                Table
                            </ActionList.Item>
                        </ActionList.Group>
                        <ActionList.Divider />
                        <ActionList.Item onClick={() => dispatch(dispatch(updateSaveDialog({ show: true, updateFiles: true })))}>
                            <span className="icon">
                                <i>{'\uE804'}</i>
                            </span>&nbsp;Save/Load
                        </ActionList.Item>
                        <ActionList.Item onClick={() => dispatch(exportGraph())} >
                            Export to file
                        </ActionList.Item>
                        <ActionList.Item >
                            <ImportButton />
                        </ActionList.Item>
                        <ActionList.Item onClick={() => downloadSvg(document.querySelector("svg#graph") as SVGSVGElement, title + ".png")} >
                            Export as image (beta)
                        </ActionList.Item>
                    </ActionList>
                </ActionMenu.Overlay>
            </ActionMenu>
        </Header.Item>
                    <Autosave/>
        <Header.Item sx={{ mr: 0 }}>
            <Button onClick={() => dispatch(addTask())}><PlusCircleIcon /> Add Task</Button>
        </Header.Item>
        {statusDialogOpen ? <StatusesModal onClose={() => setStatusDialogOpen(false)} /> : null}
    </Header>
}

/**
 * The fielname, which is editable if you click it
 */
function HeaderFileName(props: { title: string, setTitle: (title: string) => void }) {
    const [isRenaming, setRenaming] = React.useState(false);

    if (isRenaming) {
        return <Header.Item>
            <TextInput
                aria-label="FileName"
                name="file-name"
                placeholder="Untitled"
                value={props.title}
                onChange={evt => props.setTitle(evt.target.value)}
                onBlur={() => setRenaming(false)} />
        </Header.Item>;
    } else {
        return <Header.Item onClick={() => setRenaming(true)} sx={{ cursor: "cell", borderBottom: "2px solid grey" }}>"{props.title}"</Header.Item>
    }
}