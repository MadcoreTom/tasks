import { TaskType } from "../diagram/task";
import { State } from "./store";

export function updateTaskReducer(state: State, action: { payload: TaskType }) {

    if (state.selected && state.selected.type == "task") {
        state.tasks = [...state.tasks];
        state.tasks[state.selected.idx] = { ...action.payload };
    }
}