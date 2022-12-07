import { State } from "./store";

export const exportReducer = (state: State) => {
    const nodes: string[] = [];
    const links: string[] = [];

    let i = 0;
    for (let task of state.tasks) {
        i++;
        nodes.push(`${i} ${task.text} # ${JSON.stringify(task)}`);
        if (task.dependencies) {
            for (let d of task.dependencies) {
                links.push(`${d + 1} ${i} dependency`);
            }
        }
    }

    const data = nodes.join("\n") + "\n#\n" + links.join("\n");
    console.log(data);
    download("task-graph.tgf", data);
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