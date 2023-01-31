import * as React from "react";
import { COLOUR_LIST } from "../util/colour";


export function ColourPicker(props: { value: string, setValue: (value: string) => void }) {
    const [editing, setEditing] = React.useState(false);

    if (!editing) {
        return <span style={{ backgroundColor: props.value, width: "30px", height: "30px", display: "block" }} onClick={() => setEditing(true)}></span>
    } else {
        return <div style={{ height: "30px", width: "50px", display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
            {COLOUR_LIST.map((c, i) => <span style={{ backgroundColor: c, width: "10px", height: "10px" }} onClick={() => { setEditing(false); props.setValue(c) }} key={i}></span>)}
        </div>
    }
}