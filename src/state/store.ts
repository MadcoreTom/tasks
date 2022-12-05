import { configureStore, createSlice } from '@reduxjs/toolkit'
import { SPACING_X, TASK_WIDTH } from '../constants';
import { TaskType } from '../diagram/task'
import { addTaskReducer } from './addtask.reducer';
import { exportReducer } from './export.reducer';
import { removeTaskReducer } from './removetask.reducer';

type SelectedType = null | { type: "task", idx: number } | { type: "dependency", start: TaskType, end: TaskType };

export type State = {
    selected: SelectedType,
    tasks: TaskType[]
}

export type RootState = {
    main: State
}

const nodes: TaskType[] = [
    { x: 0, y: 0, text: "corner" },
    { x: 220, y: 100, text: "apple" },
    { x: 330, y: 30, text: "banana", link: { url: "http://www.google.com", text: "google" } },
    { x: 500, y: 150, text: "Upload fields", link: { url: "http://www.google.com", text: "BASE-25012" } },
    { x: 500, y: 10, text: "Hello World", link: { url: "http://www.google.com", text: "BASE-25000" } },
]

nodes[1].dependencies = [0];
nodes[2].dependencies = [0];
nodes[3].dependencies = [1,2];
nodes[4].dependencies = [2];

const mainSlice = createSlice({
    name: "main",
    initialState: {
        selected: null,
        tasks: nodes
    } as State,
    reducers: {
        select: (state, action: { payload: SelectedType }) => {
            console.log("Select", action.payload)
            state.selected = action.payload;
        },
        updateTask: (state, action: { payload: TaskType }) => {
            console.log("Update", action.payload);
            if (state.selected && state.selected.type == "task") {
                state.tasks = [...state.tasks];
                state.tasks[state.selected.idx] = { ...action.payload };
            }
        },
        sort: (state: State) => {
            console.log("Sort");

            // Set everyone to zero
            const tasks = state.tasks;
            tasks.forEach(t => t.x = 10);

            let attempts = 100;
            let moves = 1;
            while (attempts-- > 0 && moves > 0) {
                moves = 0;
                for (let t of tasks.filter(t => t.dependencies)) {
                    for (let depIdx of t.dependencies) {
                        const d = tasks[depIdx];
                        if (d.x + SPACING_X > t.x) {
                            t.x = d.x + SPACING_X;
                            moves++;
                        }
                    }
                }
                console.log("Sort", moves, attempts);
            }

            state.tasks = [...tasks];

            // move to right of dependencies

            // loop until none left
        },
        exportGraph:exportReducer,
        addTask:addTaskReducer,
        removeTask:removeTaskReducer
    }
});

export default configureStore({
    reducer: {
        main: mainSlice.reducer
    },
});

export const { select, updateTask, sort, exportGraph, addTask, removeTask } = mainSlice.actions;