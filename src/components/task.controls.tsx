import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, RootState, State, updateTask } from "../state/store";
import { Button, Checkbox, FormControl, TextInput, Textarea, Token } from "@primer/react";
import { Dropdown } from "./dropdown";

export function TaskControls() {
    const selected = useSelector((state: RootState) => state.main.selected);
    if (!selected || selected.type != "task") {
        return null;
    }
    const task = useSelector((state: RootState) => state.main.tasks[selected.idx]);
    const allTasks = useSelector((state: RootState) => state.main.tasks);
    const statuses = useSelector((state: RootState) => state.main.statuses);
    const dispatch = useDispatch();

    const removeDep = (idx: number) => {
        dispatch(updateTask({ ...task, dependencies: task.dependencies.filter(d => d != idx) }))
    }

    const link = task.link;
    let linkElem: any = null;
    if (link != undefined) {
        linkElem = <div>
            <FormControl>
                <FormControl.Label>Link Text</FormControl.Label>
                <TextInput value={link.text} onChange={evt => dispatch(updateTask({ ...task, link: { ...link, text: evt.target.value } }))} />
            </FormControl>
            <FormControl>
                <FormControl.Label>Link URL</FormControl.Label>
                <TextInput value={link.url} onChange={evt => dispatch(updateTask({ ...task, link: { ...link, url: evt.target.value } }))} />
            </FormControl>
        </div>
    }

    const deps = task.dependencies;
    let depsElem: any = null
    if (deps) {
        depsElem = <FormControl>
            <FormControl.Label>Dependencies</FormControl.Label>
            {deps.map((d, i) => <Token key={i} text={allTasks[d].text} onRemove={() => removeDep(d)} />)}
        </FormControl>
    }

    return <div>
        <FormControl>
            <FormControl.Label>Task Name</FormControl.Label>
            <Textarea block={true} onChange={evt => dispatch(updateTask({ ...task, text: evt.target.value }))} value={task.text} rows={2} />
        </FormControl>
        <hr />
        <FormControl>
            <FormControl.Label>Has a Link</FormControl.Label>
            <Checkbox checked={link != undefined} onChange={checked => dispatch(updateTask({ ...task, link: checked ? { text: "text", url: "link" } : undefined }))}/>
        </FormControl>
        {linkElem}
        <hr />
        <Dropdown
            label="Status"
            selected={task.status}
            options={statuses.map(s => [s.text, s.text] as [string, string])}
            onSelect={val => dispatch(updateTask({ ...task, status: val }))}
        />
        <hr />
        {depsElem}
        <hr />
        <Button variant="danger" onClick={() => dispatch(removeTask(selected.idx))}>Remove Task</Button>
    </div>
}
