import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskType } from "../diagram/task";
import { RootState, select, SelectedType, updateTask } from "../state/store";
import { Dropdown } from "../components/dropdown";
import { FormControl, Textarea } from "@primer/react";

export function TableMode() {
    const tasks = useSelector((state: RootState) => state.main.tasks);
    const statuses = useSelector((state: RootState) => state.main.statuses);
    let selected = useSelector((state: RootState) => state.main.selected) as SelectedType;
    const selectedIdx = (selected && selected.type == "task") ? selected.idx : -1;

    function getStatusColour(status:string){
        const statusEntry = statuses.filter(s=>s.text==status)[0];
        if(statusEntry){
            return statusEntry.colour;
        } else {
            return "black;"
        }
    }

    const rows = tasks.map((t, idx) => idx == selectedIdx ? TableRowEditable(t, idx) : TableRow(t, idx, getStatusColour(t.status)))
    return <div className="table-container"><table className="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Link</th>
                <th>Status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
    </div>
}

function TableRow(task: TaskType, idx: number, colour:string) {
    const dispatch = useDispatch();
    return <tr key={idx}>
        <td>{task.text}</td>
        <td>{task.link ? task.link.text : null}</td>
        <td><span style={{display:"inline-block",width:"10px",height:"10px",borderRadius:"5px",backgroundColor:colour}}></span>{task.status}</td>
        <td>
            <button className="button is-info is-light is-small" onMouseDown={() => dispatch(select({ type: "task", idx: idx }))}>edit</button>
        </td>
    </tr>
}

function TableRowEditable(task: TaskType, idx: number) {
    const statuses = useSelector((state: RootState) => state.main.statuses);
    const dispatch = useDispatch();
    return <tr key={idx} className="hide-labels">
        <td>
            <FormControl>
                <FormControl.Label>Link Text</FormControl.Label>
                <Textarea rows={1} value={task.text} onChange={evt => dispatch(updateTask({ ...task, text: evt.target.value }))} />
            </FormControl>
        </td>
        <td>{task.link ? task.link.text : null}</td>
        <td>
            <Dropdown label="Status" selected={task.status} options={statuses.map(s => [s.text,s.text])} onSelect={val => dispatch(updateTask({ ...task, status: val }))} />
        </td>
        <td>
        </td>
    </tr>
}
