import { State } from "./store";

export const removeTaskReducer = (state: State, action: { payload: number }) => {
    // remove dependencies
    state.tasks.filter(t=>t.dependencies && t.dependencies.indexOf(action.payload) >=0).forEach(task=>{
            task.dependencies = task.dependencies.filter(d=>d !=action.payload);
    });
    // deprecate dependency index for everyone after 
    state.tasks.filter(t=>t.dependencies).forEach(task=>{
        task.dependencies = task.dependencies?.map(d=>d>action.payload ? d-1:d);
    });
    // remove element
    state.tasks.splice(action.payload, 1);
    state.tasks = [...state.tasks];
    // deselect
    if(state.selected && state.selected.type == "task" && state.selected.idx == action.payload){
        state.selected = null;
    }
}