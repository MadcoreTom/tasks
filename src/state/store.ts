import { configureStore, createSlice } from '@reduxjs/toolkit'
import { TaskType } from '../diagram/task'

type SelectedType = null | { type: "task", idx: number } | { type: "dependency", start: TaskType, end: TaskType };

export type State = {
    selected: SelectedType
}

const nodes: TaskType[] = [
        { x: 0, y: 0, text: "corner" },
        { x: 220, y: 100, text: "apple" },
        { x: 330, y: 50, text: "banana", link: { url: "www.google.com", text: "google" } },
        { x: 500, y: 150, text: "Upload fields", link: { url: "www.google.com", text: "BASE-25012" } },
    ]
    
    nodes[1].dependencies = [nodes[0]];
    nodes[2].dependencies = [nodes[0]];
    nodes[3].dependencies = [nodes[2]];

const mainSlice = createSlice({
    name: "main",
    initialState: {
        selected: null,
        tasks: nodes as TaskType[]
    } as State,
    reducers: {
        select: (state, action: { payload: SelectedType }) => {
            console.log("Select", action.payload)
            state.selected = action.payload;
        },
        updateTask: (state, action: { payload: SelectedType }) => {
            console.log("Update", action.payload);
            if(state.selected && state.selected.type == "task"){
                state.tasks = [...state.tasks];
                state.tasks[state.selected.idx] = {...action.payload};
            }
        }
    }
});

export default configureStore({
    reducer: {
        main: mainSlice.reducer
    },
});

export const { select, updateTask } = mainSlice.actions;