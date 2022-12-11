import { TaskType } from "../diagram/task";
import { State } from "./store";

export const addTaskReducer = (state: State) => {
    const newTask:TaskType = {
        text:"",
        x:0,
        y:0,
        dependencies: [],
        status: "Future"
    }
   state.tasks = [...state.tasks, newTask];
   state.selected = {type:"task", idx: state.tasks.length-1};
}