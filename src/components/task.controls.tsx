import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../state/store";

export function TaskControls(){
    const selected = useSelector(state => state.main.selected);
    const task = useSelector(state => state.main.tasks[selected.idx]);
    const dispatch = useDispatch();



    const checked= task.link != null;
    let linkElem:any = null;
    if(checked){
        linkElem = <fieldset>
            <label>Link Text <input type="text" value={task.link.text}  onChange={evt=>dispatch(updateTask({...task, link:{...task.link, text:evt.target.value}}))}/></label>
            <label>Link URL <input type="text" value={task.link.url}  onChange={evt=>dispatch(updateTask({...task, link:{...task.link, url:evt.target.value}}))}/></label>
        </fieldset>
    }

    return <div>
        <label>Name <input type="text" value={task.text} onChange={evt=>dispatch(updateTask({...task, text:evt.target.value}))}/></label>
        <label>Has Link <input type="checkbox" checked={checked}  onChange={evt=>dispatch(updateTask({...task, link: task.link ? null : {text:"text",link:"link"}}))}/></label>
        {linkElem}
    </div>
}