import * as React from "react";
import { useDispatch } from 'react-redux'
import { TASK_HEIGHT, TASK_WIDTH, TOP_MARGIN } from "../constants";
import { select, updateTask } from "../state/store";

export const taskStatusMapping = {
    Done: "task-done",
    Available: "task-available",
    AtRisk: "task-at-risk",
    Blocked: "task-blocked",
    Future: "task-future",
}
export const TaskStatus = Object.keys(taskStatusMapping);
export type TaskStatuses =  "Future" | "Blocked" | "AtRisk" | "Done" | "Available"

export type TaskType = {
    x: number, y: number, text: string, link?: { url: string, text: string }, dependencies: number[], status: TaskStatuses
}

export function Task(props: TaskType & {idx:number}) {
    const dispatch = useDispatch();

    const y = TOP_MARGIN + props.y;

    const classNames = taskStatusMapping[props.status];
    //  stroke="hsl(171, 100%, 41%)" fill="hsl(171, 100%, 96%)" 

    let link: any = null;
    if (props.link != null) {
        const path = `M ${props.x + 10},${y + TASK_HEIGHT} l 10,-10 ${TASK_WIDTH - 40},0 10,10 -10,10 ${40 - TASK_WIDTH},0 -10,-10`;
        link = <g onClick={() => {if(props.link && props.link.url){window.open(props.link.url, '_blank').focus();}}}  className="clickable">
            <path d={path} fill="hsl(347, 90%, 96%)" stroke="hsl(348, 100%, 61%)" />
            <text x={props.x + TASK_WIDTH / 2} y={y + TASK_HEIGHT} alignmentBaseline="middle" textAnchor="middle">{props.link.text}</text>
        </g>
    }

    return <g onMouseDown={() => dispatch(select({type:"task",idx:props.idx, dragging:[0,0]}))} onMouseUp={() => dispatch(select({type:"task",idx:props.idx}))} className="clickable">
        <rect x={props.x} y={y}className={classNames} strokeWidth="2" width={TASK_WIDTH} height={TASK_HEIGHT} rx="10" ry="10" />
        <text x={props.x + TASK_WIDTH / 2} y={y + TASK_HEIGHT / 3} alignmentBaseline="middle" textAnchor="middle">{props.text}</text>
        {link}
    </g>
}
