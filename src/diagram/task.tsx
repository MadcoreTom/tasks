import * as React from "react";
import { TASK_HEIGHT, TASK_WIDTH } from "../constants";

export type TaskType = {
    x: number, y: number, text: string, link?: { url: string, text: string }, dependencies?: TaskType[]
}

export function Task(props: TaskType) {

    let link: any = null;
    if (props.link != null) {
        const path = `M ${props.x + 10},${props.y + TASK_HEIGHT} l 10,-10 ${TASK_WIDTH - 40},0 10,10 -10,10 ${40 - TASK_WIDTH},0 -10,-10`;
        link = <g onClick={() => console.log("Link to", props.link.url)}  className="clickable">
            <path d={path} fill="pink" stroke="red" />
            <text x={props.x + TASK_WIDTH / 2} y={props.y + TASK_HEIGHT} alignmentBaseline="middle" textAnchor="middle">{props.link.text}</text>
        </g>
    }

    return <g onClick={() => console.log(props.text)} className="clickable">
        <rect x={props.x} y={props.y} stroke="blue" fill="skyblue" strokeWidth="2" width={TASK_WIDTH} height={TASK_HEIGHT} rx="10" ry="10" />
        <text x={props.x + TASK_WIDTH / 2} y={props.y + TASK_HEIGHT / 3} alignmentBaseline="middle" textAnchor="middle">{props.text}</text>
        {link}
    </g>
}
