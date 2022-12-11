import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DependencyClickable, DependencyPath } from "../diagram/dependency";
import { Task, TaskType } from "../diagram/task";
import { RootState, select, SelectedType, updateTask } from "../state/store";


export function Graph() {
    let nodes = useSelector((state: RootState) => state.main.tasks) as TaskType[];
    let selected = useSelector((state: RootState) => state.main.selected) as SelectedType;
    const dispatch = useDispatch();


    let [offset, setOffset] = React.useState([0, 0]);

    const nodeElems = nodes.map((n, i) => <Task {...n} idx={i} key={i} />)
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
        // }if (evt.buttons == 2 && (evt.movementX != 0 || evt.movementY != 0)) {
        }else if(evt.buttons > 0){
            setOffset([offset[0] + evt.movementX, offset[1] + evt.movementY]);
        } 
    }
    function onRelease(evt: React.MouseEvent) {
        if (selected && selected.type == "task" && selected.dragging) {
            dispatch(select({...selected,dragging:undefined}))
        }
    }


    return <svg width="800" height="600"
        onMouseMoveCapture={onDrag}
        onMouseUp={onRelease}
        style={{ backgroundPosition: `${offset[0]}px ${offset[1]}px` }}
        onContextMenu={(e) => e.preventDefault()}>
        <g transform={`translate(${offset[0]},${offset[1]})`}>
            {pathZoneElems}
            {pathElems}
            {nodeElems}
        </g>
    </svg>
}