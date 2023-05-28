import * as React from "react";
import { useDispatch } from 'react-redux'
import { TASK_HEIGHT, TASK_WIDTH, TOP_MARGIN } from "../constants";
import { select } from "../state/store";

export type TaskType = {
    x: number, y: number, text: string, link?: { url: string, text: string }, dependencies: number[], status: string
}

export function Task(props: { task: TaskType, colour: string, idx: number, isSelected: boolean, isMultiSelect: boolean }) {
    const task = props.task;
    const dispatch = useDispatch();


    const y = TOP_MARGIN + task.y;

    const classNames = (props.isSelected ? " selected" : "");

    function openWindow(url: string) {
        const newTab = window.open(url, '_blank');
        if (newTab) {
            newTab.focus();
        }
    }

    let link: any = null;
    if (task.link != null) {
        const path = `M ${task.x + 10},${y + TASK_HEIGHT} l 10,-10 ${TASK_WIDTH - 40},0 10,10 -10,10 ${40 - TASK_WIDTH},0 -10,-10`;
        link = <g onClick={() => { if (task.link && task.link.url) { openWindow(task.link.url) } }} className="clickable">
            <path d={path} className={classNames} stroke={props.colour} fill="white" />
            <text x={task.x + TASK_WIDTH / 2} y={y + TASK_HEIGHT} alignmentBaseline="middle" textAnchor="middle" style={{ textDecoration: task.link.url ? "underline" : "none" }}>{task.link.text}</text>
        </g>
    }

    const titleLines = task.text.split(/[\r\n]/);
    const title: any[] = titleLines.map((t, i) => <tspan x={task.x + TASK_WIDTH / 2} dy={i == 0 ? 0 : "1.2em"} textAnchor="middle" key={i}>{t}</tspan>);
    const anyLinesOver20 = titleLines.filter(a => a.length > 20).length > 0;
    const fontSize = anyLinesOver20 ? "11px" : "16px";

    const onMouseDown = (evt: React.MouseEvent<SVGGElement, MouseEvent>) => {
        if (!props.isMultiSelect) {
            dispatch(select({ type: "task", idx: props.idx, dragging: [0, 0] }))
        }
    }

    const onMouseUp = (evt: React.MouseEvent<SVGGElement, MouseEvent>) => {
            dispatch(select({ type: "task", idx: props.idx }));
    }

    return <g onMouseDown={onMouseDown} onMouseUp={onMouseUp} className="clickable">
        <rect x={task.x} y={y} className={classNames} stroke={props.colour} fill="white" strokeWidth="2" width={TASK_WIDTH} height={TASK_HEIGHT} rx="10" ry="10" />
        <text x={task.x + TASK_WIDTH / 2} y={y + TASK_HEIGHT / 3} alignmentBaseline="middle" textAnchor="middle" style={{ fontSize: fontSize }}>{title}</text>
        {link}
    </g>
}