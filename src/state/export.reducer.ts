import { TaskType } from "../diagram/task";
import { State } from "./store";

const LATEST_VERSION = "v0.1"
const HEADER = `// ${LATEST_VERSION} https://madcoretom.github.io/tasks/`
const HEADER_PATTERN = /^\/\/\s+([v\d.]+).*/

export const exportReducer = (state: State) => {
    const tasks: string[] = state.tasks.map(taskToArray).map(v=>JSON.stringify(v,null,0));
    tasks.unshift(HEADER);
    const data = tasks.join("\n");
    console.log(data);
    download("task-graph.dat", data);
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

  export const importReducer = (state: State, action:{payload:string}) => {
    const lines = action.payload.split(/[\n\r]+/).filter(line=>line.trim().length > 0);
    const header = lines.shift() as string;

      const headerMatch = header.match(HEADER_PATTERN);
      if (!headerMatch) {
          console.error("Missing header");
          return;
      } else if (headerMatch[1] != LATEST_VERSION) {
          console.error(`Version mismatch. Found ${headerMatch[0]} expected ${LATEST_VERSION}`)
          return;
      }
    const tasks = lines.map(v=>arrayToTask(JSON.parse(v)));
    console.log(tasks);
    state.tasks = tasks;
    state.selected = null;
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

function arrayToTask(data:any[]):TaskType{
    return {
        text: ""+data[0],
        x:data[1][0],
        y:data[1][1],
        link:data[2] ? {text:data[2][0],url:data[2][1]} : undefined,
        status: data[3],
        dependencies: data[4]
    }
}