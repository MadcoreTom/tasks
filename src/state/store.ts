import { configureStore, createSlice } from '@reduxjs/toolkit'
import { TaskType } from '../diagram/task'

type SelectedType = null | { type: "task", task: TaskType } | { type: "dependency", start: TaskType, end: TaskType };

export type State = {
    selected: SelectedType
}

const mainSlice = createSlice({
    name: "main",
    initialState: {
        selected: null
    } as State,
    reducers: {
        select:(state, action:{payload:SelectedType})=> {
            console.log("Select", action.payload)
            state.selected = action.payload;
        }
    }
});

export default configureStore({
    reducer: {
        main: mainSlice.reducer
    },
});

export const select = mainSlice.actions.select;