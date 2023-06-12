import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NAVBAR_HEIGHT_PX, TASK_HEIGHT, TASK_WIDTH, TOP_MARGIN } from "../constants";
import { AddLinkButton } from "../diagram/addlink";
import { DependencyClickable, DependencyPath, TempDependencyPath } from "../diagram/dependency";
import { RulerGuides } from "../diagram/guides";
import { Task, TaskType } from "../diagram/task";
import { moveMultiTasks, RootState, select, SelectedType, setOffset, setTitle, updateTask } from "../state/store";


export function Graph() {
    let nodes = useSelector((state: RootState) => state.main.tasks) as TaskType[];
    let selected = useSelector((state: RootState) => state.main.selected) as SelectedType;
    let statuses = useSelector((state: RootState) => state.main.statuses);
    let offset = useSelector((state: RootState) => state.main.offset)
    const dispatch = useDispatch();
    let [mousePos, setMousePos] = React.useState([0, 0]);

    const selectedIdx = (selected && selected.type == "task") ? selected.idx : -1;
    const selectedIndices = (selected && selected.type == "multi") ? selected.nodeIdx : [];
    const isMultiSelect = selectedIndices.length > 0;

    React.useEffect(()=>{
        function onKeyPress(evt:KeyboardEvent){
            if(evt.key == "Escape"){
                dispatch(select(null));
            }
        }
        window.addEventListener("keydown", onKeyPress);
        // cleanup
        return ()=>{
            window.removeEventListener("keydown", onKeyPress);
        }
    })

    const nodeElems = nodes.map((n, i) =>
        <Task
            task={n}
            colour={statuses.filter(s => n.status == s.text)[0] ? statuses.filter(s => n.status == s.text)[0].colour : "red"}
            idx={i}
            isSelected={i == selectedIdx || selectedIndices.includes(i) } 
            key={i}
            isMultiSelect={isMultiSelect}
        />)
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
        } else if (selected && selected.type == "box") {
            const pt = getMouseXY(evt, offset);
            dispatch(select({ ...selected, end:pt }));
        } else if(selected && selected.type == "multi" && evt.buttons > 0){
            const indices = selected.nodeIdx;
            dispatch(moveMultiTasks({delta:[evt.movementX,evt.movementY], indices}))
        }else if (evt.buttons > 0) {
            dispatch(setOffset([offset[0] + evt.movementX, offset[1] + evt.movementY]));
        }
        setMousePos([evt.clientX - offset[0], evt.clientY - offset[1]]);
    }
    function onRelease(evt: React.MouseEvent) {
        if (selected) {
            if (selected.type == "task" && selected.dragging) {
                dispatch(select({ ...selected, dragging: undefined }))
            } else if (selected.type == "box") {
                if (selected.end) {
                    // Start must be the lower value
                    const sx = Math.min(selected.end[0], selected.start[0]);
                    const ex = Math.max(selected.end[0], selected.start[0]);
                    const sy = Math.min(selected.end[1], selected.start[1]);
                    const ey = Math.max(selected.end[1], selected.start[1]);

                    const sel = nodes.map((n, i) => { return { ...n, idx: i } })
                        .filter(n =>
                            n.x > sx &&
                            n.x + TASK_WIDTH < ex &&
                            n.y + TOP_MARGIN + NAVBAR_HEIGHT_PX > sy &&
                            n.y + TOP_MARGIN + TASK_HEIGHT + NAVBAR_HEIGHT_PX < ey
                        )
                        .map(n => n.idx);
                    console.log("SELECTED", sel)
                    if (sel.length == 0) {
                        dispatch(select(null));
                    } else if (sel.length == 1) {
                        dispatch(select({ type: "task", idx: sel[0] }));
                    } else {
                        dispatch(select({ type: "multi", nodeIdx: sel }));
                    }
                } else {
                    dispatch(select(null));
                }
            }
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
        let start: [number,number] | null = null;
        let end: [number,number] | null = null;
        if (selected.start) {
            start = [n.x + TASK_WIDTH, n.y + TASK_HEIGHT / 2];
            end = [mousePos[0],mousePos[1]-NAVBAR_HEIGHT_PX - TOP_MARGIN];
        } else {
            start = [mousePos[0],mousePos[1]-NAVBAR_HEIGHT_PX- TOP_MARGIN];
            end = [n.x, n.y + TASK_HEIGHT / 2 ];
        }
        addButtons = <TempDependencyPath start={start} end={end} />
    }

    const onMouseDown = (evt: React.MouseEvent) => {
        if (evt.shiftKey) {
            console.log("BOX")
            dispatch(select({ type: "box", start: getMouseXY(evt, offset) }));
        }
    }

    const boxes: any[] = [];
    if (selected && selected.type == "box" && selected.end) {
        // Start must be the lower value
        const sx = Math.min(selected.end[0], selected.start[0]);
        const ex = Math.max(selected.end[0], selected.start[0]);
        const sy = Math.min(selected.end[1], selected.start[1]);
        const ey = Math.max(selected.end[1], selected.start[1]);

        boxes[0] = <rect
            x={sx} y={sy - NAVBAR_HEIGHT_PX}
            stroke="red" fill="transparent" strokeWidth="2"
            width={ex-sx} height={ey-sy}
            strokeDasharray="5,5"
        />
    }

    return <svg height="600"
        onMouseMoveCapture={onDrag}
        onMouseUp={onRelease}
        onMouseDown={onMouseDown}
        style={{ backgroundPosition: `${offset[0]}px ${offset[1]}px` }}
        onContextMenu={(e) => e.preventDefault()}>
        <RulerGuides selected={selected} tasks={nodes} offset={offset} />
        <g transform={`translate(${offset[0]},${offset[1]})`}>
            {boxes}
            {pathZoneElems}
            {pathElems}
            {nodeElems}
            {addButtons}
        </g>
    </svg>
}

// This is wrong, but at least it's consistent
function getMouseXY(evt: React.MouseEvent, offset: number[]): [number, number] {
    return [evt.clientX - offset[0], evt.clientY - offset[1]];
}