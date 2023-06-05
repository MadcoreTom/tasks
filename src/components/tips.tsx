import * as React from "react";
import { COLOUR_MAP } from "../util/colour";

const TIPS = [
    "If you add a link to a task, it becomes clickable",
    "You can modify status colours",
    "Don't forget to save your work",
    "Feel free to give feedback",
    "Hold Shift + drag to box-select",
    "Click me!",
    "Honey doesn't spoil"
]

function selectRandom<T>(data: T[]): T {
    return data[Math.floor(Math.random() * data.length)];
}

export function Tips() {
    const [tip, setTip] = React.useState(selectRandom(TIPS));
    const [colour, setColour] = React.useState("#eee");
    function onClick(){
        setTip(selectRandom(TIPS));
        setColour(selectRandom(Object.entries(COLOUR_MAP).map(e=>e[1].light)));
    }
    return <div className="tip" onClick={onClick} style={{background:colour}}>Tip: {tip}</div>
}

