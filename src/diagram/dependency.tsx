import * as React from "react";
import { useDispatch } from 'react-redux'
import { TASK_HEIGHT, TASK_WIDTH, TOP_MARGIN } from "../constants";
import { TaskType } from "./task"
import { select } from "../state/store";

const SMOOTHNESS = 30;

export function DependencyClickable(props: { start: TaskType, end: TaskType }) {
    const dispatch = useDispatch();
    return <path stroke="rgba(0,0,0,0)" fill="none" d={calcTaskPath(props.start, props.end)} strokeWidth="10" onClick={() => dispatch(select({ type: "dependency", start: props.start, end: props.end }))} className="path-hover clickable" />
}


export function DependencyPath(props: { start: TaskType, end: TaskType }) {
    return <path stroke="hsl(204, 86%, 53%)" fill="none" d={calcTaskPath(props.start, props.end)} strokeWidth="3" />
}

export function TempDependencyPath(props: { start: [number, number], end: [number, number] }) {
    return <path stroke="hsl(204, 86%, 53%)" fill="none" d={calcPath(props.start, props.end)} strokeWidth="3" strokeDasharray="5,5" />
}


function calcTaskPath(start: TaskType, end: TaskType) {
    return calcPath(
        [start.x + TASK_WIDTH, start.y + TASK_HEIGHT / 2],
        [end.x, end.y + TASK_HEIGHT / 2]
    );
}

function calcPath(start: [number, number], end: [number, number]) {
    return `
M ${start[0]},${start[1] + TOP_MARGIN} 
C ${start[0] + SMOOTHNESS},${start[1] + TOP_MARGIN} 
  ${end[0] - SMOOTHNESS},${end[1] + TOP_MARGIN} 
  ${end[0]},${end[1] + TOP_MARGIN}`;
}