import { configureStore, createSlice } from '@reduxjs/toolkit'
import { SPACING_X, TASK_WIDTH } from '../constants';
import { TaskType } from '../diagram/task'
import { snapX, snapY } from '../util/snap';
import { addTaskReducer } from './addtask.reducer';
import { exportReducer, importReducer } from './export.reducer';
import { removeTaskReducer } from './removetask.reducer';
import { updateTaskReducer } from './updateTask.reducer';

export type SelectedType = null |
 { type: "task", idx: number, dragging?: [number,number]} |
  { type: "dependency", start: TaskType, end: TaskType } | 
  { type:"linking", start:boolean, idx:number};

export type State = {
    selected: SelectedType,
    tasks: TaskType[],
    title:string
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
        tasks: nodes,
        title: "untitled"
    } as State,
    reducers: {
        setTitle:(state:State, action:{payload:string})=>{
            state.title = action.payload;
        },
        select: (state:State, action: { payload: SelectedType }) => {
            if(state.selected && state.selected.type =="linking" && action.payload && action.payload.type == "task"){
                // complete the link
                if(state.selected.start){
                    // new selection has the dependency
                    state.tasks[action.payload.idx].dependencies.push(state.selected.idx);
                } else {
                    // old selection has the dependency (just swap above)
                    state.tasks[state.selected.idx].dependencies.push(action.payload.idx);
                }
            }
            if(state.selected && state.selected.type == "task" && state.selected.dragging && 
            action.payload && action.payload.type == "task" && !action.payload.dragging){
                // dropped task from dragging. snap to any rulers
                const sel = state.tasks[action.payload.idx];
                const sx = snapX(state.tasks,sel);
                const sy = snapY(state.tasks,sel);
                let x = sx == undefined ? sel.x : sx;
                let y = sy == undefined ? sel.y : sy;
                state.tasks[action.payload.idx] = {...sel, x, y};
            }
            state.selected = action.payload;
        },
        updateTask: updateTaskReducer,
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
        removeTask: removeTaskReducer,
        importGraph: importReducer
    }
});

export default configureStore({
    reducer: {
        main: mainSlice.reducer
    },
});

export const { select, updateTask, sort, exportGraph, addTask, removeTask, importGraph, setTitle } = mainSlice.actions;