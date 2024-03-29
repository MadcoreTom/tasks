import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectField, TextArea } from "../components/bulma";
import { TaskType } from "../diagram/task";
import { RootState, select, SelectedType, updateTask } from "../state/store";

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
            <TextArea rows={1} label="Task name" value={task.text} onChange={txt => dispatch(updateTask({ ...task, text: txt }))} />
        </td>
        <td>{task.link ? task.link.text : null}</td>
        <td>
            <SelectField label="Status" value={task.status} options={statuses.map(s => s.text)} onChange={val => dispatch(updateTask({ ...task, status: val }))} />
        </td>
        <td>
        </td>
    </tr>
}
