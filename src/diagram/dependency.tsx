import * as React from "react";
import { useDispatch } from 'react-redux'
import { TASK_HEIGHT, TASK_WIDTH, TOP_MARGIN } from "../constants";
import { TaskType } from "./task"
import { select } from "../state/store";



export function DependencyClickable(props: { start: TaskType, end: TaskType }) {
    const dispatch = useDispatch();
    return <path stroke="rgba(0,0,0,0)" fill="none" d={calcPath(props.start,props.end)} strokeWidth="10" onClick={() => dispatch(select({type:"dependency",start:props.start, end:props.end}))} className="path-hover clickable" />
}


export function DependencyPath(props: { start: TaskType, end: TaskType }) {
    return <path stroke="hsl(204, 86%, 53%)" fill="none" d={calcPath(props.start,props.end)} strokeWidth="3" />
}

function calcPath(start: TaskType, end: TaskType) {
    return `
M ${start.x + TASK_WIDTH},${start.y + TASK_HEIGHT / 2 + TOP_MARGIN} 
C ${start.x + TASK_WIDTH + 20},${start.y + TASK_HEIGHT / 2 + TOP_MARGIN} 
  ${end.x - 20},${end.y + TASK_HEIGHT / 2 + TOP_MARGIN} 
  ${end.x},${end.y + TASK_HEIGHT / 2 + TOP_MARGIN}`;
}