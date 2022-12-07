import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskStatus, TaskStatuses } from "../diagram/task";
import { removeTask, RootState, State, updateTask } from "../state/store";
import { CheckboxField, SelectField, TextField } from "./bulma";

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
            <table className="table is-fullwidth">
                <tbody>
                {deps.map((d,i)=><tr key={i}><td>{allTasks[d].text}</td><td><button className="button is-danger is-light is-small" onClick={()=>removeDep(d)}>✖</button></td></tr>)}
              </tbody>
            </table>
            {/* <div className="select">
                <select value={dependencyChoice} onChange={e=>setDependencyChoice(parseInt(e.target.value))}>
                    {allTasks.map((t,i)=><option value={i} key={i}>{t.text}</option>)}
                </select>
            </div> */}
            
        <SelectField label="Add Dependency" value={""+dependencyChoice} options={allTasks.map(t=>t.text)} values={allTasks.map((t,i)=>""+i)} onChange={val=>setDependencyChoice(parseInt(val))}/>
                <button className="button is-success is-small" onClick={()=>dispatch(updateTask({...task, dependencies:[...task.dependencies,dependencyChoice ]}))}>+</button>
        </fieldset>
    }

    return <div>
        <TextField label="Task name" value={task.text} onChange={txt=>dispatch(updateTask({...task, text :txt}))}/>
        <hr/>
        <CheckboxField label="Has a link" checked={link != undefined} onChange={checked=>dispatch(updateTask({...task, link: checked ?  {text:"text",url:"link"}:undefined}))}/>
        {linkElem}
        <hr />
        <SelectField label="Status" value={task.status} options={TaskStatus} onChange={val=>dispatch(updateTask({ ...task, status: val as TaskStatuses }))}/>
        <hr />
        {depsElem}
        <hr/>
        <button className="button is-danger" onClick={()=>dispatch(removeTask(selected.idx))}>Remove Task</button>
    </div>
}
