import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskType } from "../diagram/task";
import { RootState, select, SelectedType } from "../state/store";

export function TableMode() {
    const tasks = useSelector((state: RootState) => state.main.tasks);
    let selected = useSelector((state: RootState) => state.main.selected) as SelectedType;
    const selectedIdx = (selected && selected.type == "task") ? selected.idx : -1;

    const rows = tasks.map((t, idx) => TableRow(t, idx, idx == selectedIdx))
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

function TableRow(task: TaskType, idx: number, selected: boolean) {
    const dispatch = useDispatch();
    return <tr key={idx}>
        <td>{task.text}</td>
        <td>{task.link ? task.link.text : null}</td>
        <td>{task.status}</td>
        <td>
            {selected ?
                <button className="button is-success is-light is-small" >selected</button> :
                <button className="button is-info is-light is-small" onMouseDown={() => dispatch(select({ type: "task", idx: idx }))}>edit</button>
            }
        </td>
    </tr>
}
