import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, RootState, State, updateTask } from "../state/store";

export function TaskControls(){
    const selected = useSelector((state : RootState) => state.main.selected);
    if(!selected || selected.type != "task"){
        return null;
    }
    const task = useSelector((state : RootState) => state.main.tasks[selected.idx]);
    const dispatch = useDispatch();



    const link= task.link;
    let linkElem:any = null;
    if(link != null){
        linkElem = <fieldset>
            <label>Link Text <input type="text" value={link.text}  onChange={evt=>dispatch(updateTask({...task, link:{...link, text:evt.target.value}}))}/></label>
            <label>Link URL <input type="text" value={link.url}  onChange={evt=>dispatch(updateTask({...task, link:{...link, url:evt.target.value}}))}/></label>
        </fieldset>
    }

    return <div>
        <label>Name <input type="text" value={task.text} onChange={evt=>dispatch(updateTask({...task, text:evt.target.value}))}/></label>
        <label>Has Link <input type="checkbox" checked={link != null}  onChange={evt=>dispatch(updateTask({...task, link: link==null ? null : {text:"text",link:"link"}}))}/></label>
        {linkElem}
        <button onClick={()=>dispatch(removeTask(selected.idx))}>Remove</button>
    </div>
}