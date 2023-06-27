import { State } from "./store";

export const addStatusReducer = (state: State) => {
    let attempt = 0;
    let newName = "New State";
    while (state.statuses.filter(s => s.text == newName).length > 0) {
        newName = `New State ${++attempt}`;
    }
    state.statuses = [...state.statuses, { text: newName, colour: "red" }]
    if (state.autosave) {
        state.autosaveChanges++;
    }
}

export const renameStatusReducer = (state: State, action: { payload: { from: string, to: string } }) => {
    let { from, to } = action.payload;
    // check it exists
    const exists = state.statuses.filter(s => s.text == from).length == 1
    const unique = state.statuses.filter(s => s.text == to).length == 0;
    if(!unique){
        to += "_";
    }
    if (exists) {
        // rename state
        state.statuses = state.statuses.map(s => {
            return { text: s.text == from ? to : s.text, colour: s.colour }
        });
        // rename task statuses
        state.tasks = state.tasks.map(t => {
            if (t.status == from) {
                return { ...t, status: to };
            }
            return t;
        })
    }
    if (state.autosave) {
        state.autosaveChanges++;
    }
}

export const setStatusColourReducer = (state: State, action: { payload: { status: string, colour: string } }) => {
    const { status, colour } = action.payload;

    state.statuses = state.statuses.map(t => {
        if (t.text == status) {
            return { ...t, colour: colour };
        }
        return t;
    })
    if (state.autosave) {
        state.autosaveChanges++;
    }
}

export const removeStausReducer = (state: State, action: { payload: string }) => {
    const status = action.payload;
    const count = state.tasks.filter(t => t.status == status).length;
    if (count == 0) {
        state.statuses = state.statuses.filter(s => s.text != status);
    } else {
        console.warn("There are existing tasks with this status");
    }
    if (state.autosave) {
        state.autosaveChanges++;
    }
}