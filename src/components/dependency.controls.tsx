import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, select, updateTask } from "../state/store";

export function DependencyControls() {
    const selected = useSelector((state: RootState) => state.main.selected);
    const allTasks = useSelector((state : RootState) => state.main.tasks);
    const dispatch = useDispatch();

    if (!selected || selected.type != "dependency") {
        return null;
    }

    const end = selected.end;
    const start = selected.start;

    function remove(){
        dispatch(select({type:"task",idx:allTasks.indexOf(end)}))
        dispatch(updateTask({...end, dependencies: end.dependencies.filter(d=>d != allTasks.indexOf(start))}))
    }

    return <div>
        <p>Task <b>{end.text}</b> depends on task <b>{selected.start.text}</b></p>
        <button className="button is-danger" onClick={()=>remove()}>Remove Dependency</button>
    </div>
}