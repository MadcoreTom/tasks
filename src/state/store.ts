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
    { "x": 10, "y": 0, "text": "Plan Trip", "dependencies": [], "link": { "url": "https://pebblar.com/", "text": "Pebblar" }, status: "Done" },
    { "x": 210, "y": 100, "text": "Book flights", "dependencies": [0], status: "Done" },
    { "x": 410, "y": 30, "text": "Book tours", "link": { "url": "https://www.google.com/search?q=book+tours", "text": "google" }, "dependencies": [0, 1], status: "Available" },
    { "x": 610, "y": 150, "text": "Raise Ticket", "link": { "url": "https://jira.atlassian.com/", "text": "TKT-123" }, "dependencies": [2], status: "Future" },
    { "x": 610, "y": 10, "text": "Some other ticket", "link": { "url": "https://jira.atlassian.com/", "text": "TKT-456" }, "dependencies": [2], status: "Future" },
]


const mainSlice = createSlice({
    name: "main",
    initialState: {
        selected: null,
        tasks: nodes
    } as State,
    reducers: {
        select: (state, action: { payload: SelectedType }) => {
            state.selected = action.payload;
        },
        updateTask: (state, action: { payload: TaskType }) => {
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
        exportGraph: exportReducer,
        addTask: addTaskReducer,
        removeTask: removeTaskReducer
    }
});

export default configureStore({
    reducer: {
        main: mainSlice.reducer
    },
});

export const { select, updateTask, sort, exportGraph, addTask, removeTask } = mainSlice.actions;