import * as React from "react";
import { useSelector } from 'react-redux'


export function ControlPanel() {
    const selected = useSelector(state => state.main.selected)
    const selectedText = selected ? JSON.stringify(selected) : "nothing";

    return <div>
        <h3>Control Panel</h3>
        <p>Selected {selectedText}</p>
    </div>
}