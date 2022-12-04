import * as React from "react";
import { createRoot } from 'react-dom/client';

type NodeType = {
    x: number, y: number, text: string, link?: { url: string, text: string }, dependencies?: NodeType[]
}

const nodes: NodeType[] = [
    { x: 0, y: 0, text: "corner" },
    { x: 220, y: 100, text: "apple" },
    { x: 330, y: 50, text: "banana", link: { url: "www.google.com", text: "google" } },
    { x: 500, y: 150, text: "Upload fields", link: { url: "www.google.com", text: "BASE-25012" } },
]
const w = 150;
const h = 50;

nodes[1].dependencies = [nodes[0]];
nodes[2].dependencies = [nodes[0]];
nodes[3].dependencies = [nodes[2]];

function App() {

    const nodeElems = nodes.map((n, i) => <Node {...n} key={i} />)
    const pathZoneElems = nodes
        .filter(n => n.dependencies)
        .map(n => { return n.dependencies.map(d => { return { start: d, end: n } }) })
        .flat()
        .map((j, i) => <path key={i} stroke="white" strokeWidth={10} fill="none" d={`
    M ${j.start.x + w},${j.start.y + h / 2} 
    C ${j.start.x + w + 20},${j.start.y + h / 2} 
      ${j.end.x - 20},${j.end.y + h / 2} 
      ${j.end.x},${j.end.y + h / 2}`} onClick={() => console.log("Zone", j)} className="path-hover"/>)
    const pathElems = nodes
        .filter(n => n.dependencies)
        .map(n => { return n.dependencies.map(d => { return { start: d, end: n } }) })
        .flat()
        .map((j, i) => <path key={i} stroke="magenta" fill="none" d={`
        M ${j.start.x + w},${j.start.y + h / 2} 
        C ${j.start.x + w + 20},${j.start.y + h / 2} 
          ${j.end.x - 20},${j.end.y + h / 2} 
          ${j.end.x},${j.end.y + h / 2}`} />)

    return <svg width="800" height="600">
        {pathZoneElems}
        {pathElems}
        {nodeElems}
    </svg>
}

function Node(props: NodeType) {

    let link: any = null;
    if (props.link != null) {
        const path = `M ${props.x + 10},${props.y + h} l 10,-10 ${w - 40},0 10,10 -10,10 ${40 - w},0 -10,-10`;
        link = <g onClick={() => console.log("Link to", props.link.url)}>
            <path d={path} fill="pink" stroke="red" />
            <text x={props.x + w / 2} y={props.y + h} alignmentBaseline="middle" textAnchor="middle">{props.link.text}</text>
        </g>
    }

    return <g onClick={() => console.log(props.text)}>
        <rect x={props.x} y={props.y} stroke="blue" fill="skyblue" strokeWidth="2" width={w} height={h} rx="10" ry="10" />
        <text x={props.x + w / 2} y={props.y + h / 3} alignmentBaseline="middle" textAnchor="middle">{props.text}</text>
        {link}
    </g>
}


createRoot(document.querySelector("#root") as HTMLElement).render(<App />,);