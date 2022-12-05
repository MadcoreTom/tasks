import * as React from "react";
import { createRoot } from 'react-dom/client';
import { DependencyClickable, DependencyPath } from "./diagram/dependency";
import { Task, TaskType } from "./diagram/task";
import { Provider, useSelector } from 'react-redux'
import store from "./state/store";
import { ControlPanel } from "./components/controlpanel";


function App() {
    let nodes = useSelector(state => state.main.tasks) as TaskType[];


    const nodeElems = nodes.map((n, i) => <Task {...n} idx={i} key={i} />)
    const pathZoneElems = nodes
        .filter(n => n.dependencies)
        .map(n => { return n.dependencies.map(d => { return { start: d, end: n } }) })
        .flat()
        .map((j, i) => <DependencyPath start={j.start} end={j.end} key={i}/>)
    const pathElems = nodes
        .filter(n => n.dependencies)
        .map(n => { return n.dependencies.map(d => { return { start: d, end: n } }) })
        .flat()
        .map((j, i) => <DependencyClickable start={j.start} end={j.end} key={i}/>)

    return <div className="main">
        <svg width="800" height="600">
            {pathZoneElems}
            {pathElems}
            {nodeElems}
        </svg>
        <ControlPanel/>
    </div>
}



createRoot(document.querySelector("#root") as HTMLElement)
.render(<Provider store={store}><App /></Provider>,);