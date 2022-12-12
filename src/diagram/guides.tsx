import * as React from "react";
import { TASK_HEIGHT, TASK_WIDTH, TOP_MARGIN } from "../constants";
import { SelectedType } from "../state/store";
import { snapX, snapY } from "../util/snap";
import { TaskType } from "./task";

export function RulerGuides(props: { selected: SelectedType, tasks: TaskType[], offset: number[] }) {
    let rulerGuides: any = null;
    const { selected, tasks, offset } = props;
    if (selected && selected.type == "task" && selected.dragging) {
        let sx = snapX(tasks, tasks[selected.idx]);
        let sy = snapY(tasks, tasks[selected.idx]);

        rulerGuides = <g>
            {sx ? <line stroke="orangered" strokeDasharray="10,5" x1={sx + TASK_WIDTH / 2 + offset[0]} x2={sx + TASK_WIDTH / 2 + offset[0]} y1="0" y2="100%" /> : null}
            {sy ? <line stroke="orangered" strokeDasharray="10,5" x1="0" x2="100%" y1={sy + TASK_HEIGHT / 2 + TOP_MARGIN + offset[1]} y2={sy + TASK_HEIGHT / 2 + TOP_MARGIN + offset[1]} /> : null}
        </g>
    }
    return rulerGuides;
}