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
}