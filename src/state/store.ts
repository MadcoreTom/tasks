import { configureStore, createSlice } from '@reduxjs/toolkit'
import { SPACING_X, TASK_WIDTH } from '../constants';
import { TaskType } from '../diagram/task'
import { COLOUR_MAP } from '../util/colour';
import { snapX, snapY } from '../util/snap';
import { addTaskReducer } from './addtask.reducer';
import { exportReducer, importReducer, saveLocalReducer } from './export.reducer';
import { removeTaskReducer } from './removetask.reducer';
import { addStatusReducer, removeStausReducer, renameStatusReducer, setStatusColourReducer } from './status.reducer';
import { updateTaskReducer } from './updateTask.reducer';
import { LOCAL_STORAGE } from '../util/local-storage';

export type SelectedType = null |
{ type: "task", idx: number, dragging?: [number, number] } |
{ type: "dependency", start: TaskType, end: TaskType } |
{ type: "linking", start: boolean, idx: number } |
{ type: "box", start: [number, number], end?: [number, number] } |
{ type: "multi", nodeIdx: number[] };

export type State = {
    selected: SelectedType,
    tasks: TaskType[],
    title:string,
    viewMode: 'graph' | 'table',
    statuses: {text:string,colour:string}[],
    saveDialog: {show:boolean, files:string[]},
    offset:[number,number]
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

export function createDefaultStatuses(): { text: string, colour: string }[] {
    return [
        { text: "Future", colour: COLOUR_MAP.blue.light },
        { text: "Blocked", colour: COLOUR_MAP.red.med },
        { text: "AtRisk", colour: COLOUR_MAP.yellow.med },
        { text: "Done", colour: COLOUR_MAP.green.med },
        { text: "Available", colour: COLOUR_MAP.purple.med },
    ]
}


const mainSlice = createSlice({
    name: "main",
    initialState: {
        selected: null,
        tasks: nodes,
        title: "Untitled",
        viewMode: 'graph',
        statuses: createDefaultStatuses(),
        saveDialog: {show:false,files:[]},
        offset:[0,0]
    } as State,
    reducers: {
        setOffset:(state:State, action:{payload:[number,number]})=>{
            state.offset = [...action.payload];
        },
        setViewMode:(state:State,action:{payload:'graph' | 'table'})=>{
            state.viewMode = action.payload;
        },
        setTitle:(state:State, action:{payload:string})=>{
            state.title = action.payload;
        },
        updateSaveDialog:(state:State, action:{payload:{show:boolean,updateFiles:boolean}})=>{
            state.saveDialog.show = action.payload.show;
            if(action.payload.updateFiles){
                state.saveDialog.files = LOCAL_STORAGE.listFiles();
            }
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
        // TODO move
        moveMultiTasks: (state: State, action: { payload: { delta: [number, number], indices: number[] } }) => {
            action.payload.indices.forEach(i => {
                state.tasks[i] = {
                    ...state.tasks[i],
                    x: state.tasks[i].x + action.payload.delta[0],
                    y: state.tasks[i].y + action.payload.delta[1]
                }
            })
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
        saveLocalGraph: saveLocalReducer,
        addTask: addTaskReducer,
        removeTask: removeTaskReducer,
        importGraph: importReducer,
        renameStatus: renameStatusReducer,
        addStatus: addStatusReducer,
        setStatusColour: setStatusColourReducer,
        removeStatus:removeStausReducer
    }
});

export default configureStore({
    reducer: {
        main: mainSlice.reducer
    },
});

export const { select, updateTask, sort, exportGraph, addTask, removeTask, importGraph, setTitle, setViewMode, renameStatus, addStatus, setStatusColour, removeStatus, moveMultiTasks, saveLocalGraph, updateSaveDialog, setOffset } = mainSlice.actions;