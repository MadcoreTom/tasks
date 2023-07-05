import { FormControl, Select } from "@primer/react";
import * as React from "react";

export function Dropdown(props: { label: string, options: [string, string][], selected: string, onSelect: (sel: string) => void }) {
    const options = props.options.map(([key, name]) =>
        <Select.Option value={key} key={key} >{name}</Select.Option>
    )

    return <FormControl>
        <FormControl.Label>{props.label}</FormControl.Label>
        <Select block={true} onChange={sel => props.onSelect(sel.target.value)} value={props.selected}>
            {options}
        </Select>
    </FormControl>
}