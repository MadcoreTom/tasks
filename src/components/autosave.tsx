import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, autosave, setAutosave } from "../state/store";
import { Checkbox, FormControl } from "@primer/react";

let timer:number|null = null;

export function Autosave(): JSX.Element {
    const dispatch = useDispatch();
    const autosaveEnabled = useSelector((state: RootState) => state.main.autosave);
    const autosaveChanges = useSelector((state: RootState) => state.main.autosaveChanges);

    if(timer){
        clearTimeout(timer);
        timer = null;
    }
    if(autosaveEnabled && autosaveChanges > 0){
        timer = setTimeout(() => {
            dispatch(autosave());
        }, 2000);
    }

    const text = `Autosave ${autosaveEnabled ? (autosaveChanges <= 0 ? '😎' : '⏲') : ''}`;

    return <FormControl>
        <Checkbox checked={autosaveEnabled} onChange={evt => dispatch(setAutosave(evt.target.checked))} />
        <FormControl.Label>{text}</FormControl.Label>
    </FormControl>
}