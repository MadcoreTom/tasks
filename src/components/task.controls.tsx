import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, RootState, State, updateTask } from "../state/store";
import { CheckboxField, TextField } from "./bulma";

export function TaskControls(){
    const selected = useSelector((state : RootState) => state.main.selected);
    if(!selected || selected.type != "task"){
        return null;
    }
    const task = useSelector((state : RootState) => state.main.tasks[selected.idx]);
    const allTasks = useSelector((state : RootState) => state.main.tasks);
    const dispatch = useDispatch();

    const [dependencyChoice,setDependencyChoice] = React.useState(0);

    const removeDep = (idx:number)=>{
        dispatch(updateTask({...task, dependencies: task.dependencies.filter(d=>d!=idx)}))
    }

    const link= task.link;
    let linkElem:any = null;
    if(link != undefined){
        linkElem = <div>
            <TextField label="Link Text" value={link.text} onChange={txt=>dispatch(updateTask({...task, link:{...link, text:txt}}))}/>
            <TextField label="Link URL" value={link.url} onChange={txt=>dispatch(updateTask({...task, link:{...link, url:txt}}))}/>
        </div>
    }

    const deps = task.dependencies;
    let depsElem:any=null
    if(deps){
        depsElem = <fieldset>
            <legend>Dependencies</legend>
            <ul>
              {deps.map((d,i)=><li key={i}>{d} - {allTasks[d].text} <button className="button is-danger is-light is-small" onClick={()=>removeDep(d)}>✖</button></li>)}
            </ul>
            <div  className="select">
                <select value={dependencyChoice} onChange={e=>setDependencyChoice(parseInt(e.target.value))}>
                    {allTasks.map((t,i)=><option value={i} key={i}>{t.text}</option>)}
                </select>
                <button className="button is-success is-small" onClick={()=>dispatch(updateTask({...task, dependencies:[...task.dependencies,dependencyChoice ]}))}>Add Dependency</button>
            </div>
        </fieldset>
    }

    return <div>
        <TextField label="Task name" value={task.text} onChange={txt=>dispatch(updateTask({...task, text :txt}))}/>
        <hr/>
        <CheckboxField label="Has a link" checked={link != undefined} onChange={checked=>dispatch(updateTask({...task, link: checked ?  {text:"text",url:"link"}:undefined}))}/>
        {linkElem}
        <hr/>
        {depsElem}
        <hr/>
        <button className="button is-danger" onClick={()=>dispatch(removeTask(selected.idx))}>Remove Task</button>
    </div>
}