import * as React from "react";
import { TASK_HEIGHT, TASK_WIDTH } from "../constants";
import { TaskType } from "./task"



export function DependencyClickable(props: { start: TaskType, end: TaskType }) {
    return <path stroke="rgba(0,0,0,0)" fill="none" d={calcPath(props.start,props.end)} strokeWidth="10" onClick={() => console.log("Link", props.start, props.end)} className="path-hover clickable" />
}


export function DependencyPath(props: { start: TaskType, end: TaskType }) {
    return <path stroke="magenta" fill="none" d={calcPath(props.start,props.end)} strokeWidth="3" />
}

function calcPath(start: TaskType, end: TaskType) {
    return `
M ${start.x + TASK_WIDTH},${start.y + TASK_HEIGHT / 2} 
C ${start.x + TASK_WIDTH + 20},${start.y + TASK_HEIGHT / 2} 
  ${end.x - 20},${end.y + TASK_HEIGHT / 2} 
  ${end.x},${end.y + TASK_HEIGHT / 2}`;
}