import * as React from "react";
import { createRoot } from 'react-dom/client';
import { DependencyClickable, DependencyPath } from "./diagram/dependency";
import { Task, TaskType } from "./diagram/task";
import { Provider } from 'react-redux'
import store from "./state/store";
import { ControlPanel } from "./components/controlpanel";


const nodes: TaskType[] = [
    { x: 0, y: 0, text: "corner" },
    { x: 220, y: 100, text: "apple" },
    { x: 330, y: 50, text: "banana", link: { url: "www.google.com", text: "google" } },
    { x: 500, y: 150, text: "Upload fields", link: { url: "www.google.com", text: "BASE-25012" } },
]

nodes[1].dependencies = [nodes[0]];
nodes[2].dependencies = [nodes[0]];
nodes[3].dependencies = [nodes[2]];

function App() {

    const nodeElems = nodes.map((n, i) => <Task {...n} key={i} />)
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