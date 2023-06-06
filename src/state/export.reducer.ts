import { TaskType } from "../diagram/task";
import { LOCAL_STORAGE } from "../util/local-storage";
import { createDefaultStatuses, State } from "./store";

const LATEST_VERSION = "v0.2"
const HEADER = `// ${LATEST_VERSION} https://madcoretom.github.io/tasks/`
const HEADER_PATTERN = /^\/\/\s+([v\d.]+).*/

function saveToString(state: State): string {
    const lines: string[] = state.tasks.map(taskToArray).map(v => "T" + JSON.stringify(v, null, 0));
    state.statuses.forEach(s => lines.push("S" + JSON.stringify(statusToArray(s))));
    lines.unshift(HEADER);
    return lines.join("\n");
}

export const exportReducer = (state: State) => {
    const data = saveToString(state);
    console.log(data);
    download(`${state.title}.dat`, data);
}
export const saveLocalReducer = (state: State, action: { payload: string }) => {
    const data = saveToString(state);
    LOCAL_STORAGE.saveFile(action.payload, data);
}

// https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export const importReducer = (state: State, action: { payload: { data: string, title: string } }) => {
    const lines = action.payload.data.split(/[\n\r]+/).filter(line => line.trim().length > 0);
    const header = lines.shift() as string;

    const headerMatch = header.match(HEADER_PATTERN);
    if (!headerMatch) {
        console.error("Missing header");
        return;
    } else if (headerMatch[1] == "v0.1") {
        importv01(lines, state);
    } else if (headerMatch[1] == "v0.2") {
        importv02(lines, state);
    } else {
        console.error(`Unsupported version found - ${headerMatch[0]}, latest version is ${LATEST_VERSION}`)
    }

    console.log(`Loaded vesrion ${headerMatch[1]}`)

    const dot = action.payload.title.lastIndexOf(".");
    state.title = dot > 0 ? action.payload.title.substring(0, dot) : action.payload.title;
}

function importv01(lines: string[], state: State) {
    const tasks = lines.map(v => arrayToTask(JSON.parse(v)));
    console.log(tasks);
    state.tasks = tasks;
    state.selected = null;
    state.statuses = createDefaultStatuses();
}


function importv02(lines: string[], state: State) {

    const statusLines = lines.filter(line => line.startsWith("S")).map(line => line.substring(1));
    const taskLines = lines.filter(line => line.startsWith("T")).map(line => line.substring(1));
    console.log(statusLines, taskLines)

    const tasks = taskLines.map(v => arrayToTask(JSON.parse(v)));
    console.log(tasks);
    state.tasks = tasks;
    state.selected = null;
    state.statuses = statusLines.map(v => arrayToStatus(JSON.parse(v)));
}



function taskToArray(task: TaskType): any[] {
    return [
        task.text,
        [task.x, task.y],
        task.link ? [task.link.text, task.link.url] : null,
        task.status,
        task.dependencies
    ]
}

function arrayToTask(data: any[]): TaskType {
    return {
        text: "" + data[0],
        x: data[1][0],
        y: data[1][1],
        link: data[2] ? { text: data[2][0], url: data[2][1] } : undefined,
        status: data[3],
        dependencies: data[4]
    }
}

function arrayToStatus(data: any[]): { text: string, colour: string } {
    return {
        text: data[0],
        colour: data[1]
    }
}

function statusToArray(status: { text: string, colour: string }): any[] {
    return [
        status.text, status.colour
    ]
}