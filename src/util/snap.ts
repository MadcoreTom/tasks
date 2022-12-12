import { TaskType } from "../diagram/task";


export function snapX(tasks: TaskType[], selected: TaskType): number | undefined {
    const found = tasks
        .filter(n => n != selected)
        .map(n => { return { node: n, dx: Math.abs(selected.x - n.x) } })
        .filter(n => n.dx < 10)
        .sort((a, b) => a.dx - b.dx)[0];
        return found ? found.node.x :undefined;
}

export function snapY(tasks: TaskType[], selected: TaskType): number | undefined {
    const found = tasks
        .filter(n => n != selected)
        .map(n => { return { node: n, dy: Math.abs(selected.y - n.y) } })
        .filter(n => n.dy < 10)
        .sort((a, b) => a.dy - b.dy)[0];
        return found ? found.node.y :undefined;
}