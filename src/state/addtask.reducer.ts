import { TOP_MARGIN } from "../constants";
import { TASK_HEIGHT, TASK_WIDTH } from "../constants";
import { TaskType } from "../diagram/task";
import { State } from "./store";

export const addTaskReducer = (state: State) => {
    const svg = document.querySelector("svg") as SVGSVGElement;
    const newTask: TaskType = {
        text: "",
        x: (svg.clientWidth - TASK_WIDTH) / 2 - state.offset[0],
        y: (svg.clientHeight - TASK_HEIGHT) / 2 - state.offset[1] - TOP_MARGIN,
        dependencies: [],
        status: "Future"
    }
    state.tasks = [...state.tasks, newTask];
   state.selected = {type:"task", idx: state.tasks.length-1};
    if (state.autosave) {
        state.autosaveChanges++;
    }
}