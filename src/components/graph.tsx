import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TASK_HEIGHT, TASK_WIDTH, TOP_MARGIN } from "../constants";
import { AddLinkButton } from "../diagram/addlink";
import { DependencyClickable, DependencyPath } from "../diagram/dependency";
import { RulerGuides } from "../diagram/guides";
import { Task, TaskType } from "../diagram/task";
import { RootState, select, SelectedType, updateTask } from "../state/store";


export function Graph() {
    let nodes = useSelector((state: RootState) => state.main.tasks) as TaskType[];
    let selected = useSelector((state: RootState) => state.main.selected) as SelectedType;
    const dispatch = useDispatch();
    let [mousePos, setMousePos] = React.useState([0, 0]);

    const selectedIdx = (selected && selected.type == "task") ? selected.idx : -1;


    let [offset, setOffset] = React.useState([0, 0]);

    const nodeElems = nodes.map((n, i) => <Task task={n} idx={i} isSelected={i == selectedIdx} key={i} />)
    const pathZoneElems = nodes
        .filter(n => n.dependencies)
        .map(n => { return n.dependencies.map(i => nodes[i]).map(d => { return { start: d, end: n } }) })
        .flat()
        .map((j, i) => <DependencyPath start={j.start} end={j.end} key={i} />)
    const pathElems = nodes
        .filter(n => n.dependencies)
        .map(n => { return n.dependencies.map(i => nodes[i]).map(d => { return { start: d, end: n } }) })
        .flat()
        .map((j, i) => <DependencyClickable start={j.start} end={j.end} key={i} />)

    function onDrag(evt: React.MouseEvent) {
        if (selected && selected.type == "task" && selected.dragging) {
            const n = nodes[selected.idx];
            dispatch(updateTask({ ...n, x: n.x + evt.movementX, y: n.y + evt.movementY }));
        } else if (evt.buttons > 0) {
            setOffset([offset[0] + evt.movementX, offset[1] + evt.movementY]);
        }
        setMousePos([evt.clientX-offset[0], evt.clientY-offset[1]]);
    }
    function onRelease(evt: React.MouseEvent) {
        if (selected && selected.type == "task" && selected.dragging) {
            dispatch(select({ ...selected, dragging: undefined }))
        }
    }


  

    let addButtons: any = null;
    if (selected && selected.type == "task") {
        const n = nodes[selected.idx];
        addButtons = <g>
            <AddLinkButton x={n.x - 40} y={n.y + TASK_HEIGHT / 2} idx={selected.idx} isStart={false} />
            <AddLinkButton x={n.x + TASK_WIDTH + 40} y={n.y + TASK_HEIGHT / 2} idx={selected.idx} isStart={true} />
        </g>
    } else if (selected && selected.type == "linking") {
        const n = nodes[selected.idx];
        let start: number[] | null = null;
        let end: number[] | null = null;
        if (selected.start) {
            start = [n.x + TASK_WIDTH, n.y + TASK_HEIGHT / 2 + TOP_MARGIN];
            end = mousePos;
        } else {
            start = mousePos;
            end = [n.x, n.y + TASK_HEIGHT / 2+ TOP_MARGIN];
        }
        const path = `M ${start[0]},${start[1]} L ${end[0]},${end[1]}`;
        addButtons = <path d={path} stroke="magenta" style={{pointerEvents:"none"}}  strokeWidth="3"/>
    }


    return <svg width="800" height="600"
        onMouseMoveCapture={onDrag}
        onMouseUp={onRelease}
        style={{ backgroundPosition: `${offset[0]}px ${offset[1]}px` }}
        onContextMenu={(e) => e.preventDefault()}>
        <RulerGuides selected={selected} tasks={nodes} offset={offset}/>
        <g transform={`translate(${offset[0]},${offset[1]})`}>
            {pathZoneElems}
            {pathElems}
            {nodeElems}
            {addButtons}
        </g>
    </svg>
}