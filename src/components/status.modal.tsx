import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStatus, removeStatus, renameStatus, RootState, setStatusColour } from "../state/store";
import { Box, Dialog, FilterList, FormControl, Label, TextInput } from "@primer/react";
import { COLOUR_LIST } from "../util/colour";
import { CheckIcon, PlusCircleIcon } from "@primer/octicons-react";

// function StatusModalRow(props: { status: { text: string, colour: string }, idx: number, statusCount: number }) {
//     const dispatch = useDispatch();
//     const { text, colour } = props.status;
//     return <tr key={props.idx}>
//         <td><input className="input" type="text" value={text} onChange={evt => dispatch(renameStatus({ from: text, to: evt.target.value }))} /></td>
//         <td style={{ verticalAlign: "middle" }}>
//             <ColourPicker value={colour} setValue={newColour => dispatch(setStatusColour({ status: text, colour: newColour }))} />
//         </td>
//         <td style={{ verticalAlign: "middle", textAlign: "center" }}><label className="checkbox">
//             {props.statusCount == 0 ? <ButtonIcon text="Remove" buttonClass="is-small is-light is-danger" iconCode="x" onClick={() => dispatch(removeStatus(text))} /> : props.statusCount}
//         </label></td>
//     </tr>
// }

// TODO rename to propertyModal
export function StatusesModal(props: { onClose: () => any }) {
    const dispatch = useDispatch();
    const statuses = useSelector((state: RootState) => state.main.statuses);
    const [selectedProperty, setSelectedProperty] = React.useState("Status");
    const [selectedItem, selectItem] = React.useState("Future");


    const properties = {
        "Status": statuses,
        // "Test": []
    }

    const propertyElems = Object.entries(properties).map(([key, value]) => {
        return <FilterList.Item
            key={key}
            selected={key == selectedProperty}
            count={value.length > 0 ? value.length : undefined}
            onClick={() => setSelectedProperty(key)}>
            {key}
        </FilterList.Item>
    });

    const items = properties[selectedProperty].map((property, i) => {
        return <FilterList.Item
            key={i}
            selected={selectedItem == property.text}
            onClick={() => selectItem(property.text)}
        >
            {property.text} - <Label sx={{ backgroundColor: property.colour }}>{property.colour}</Label>
        </FilterList.Item>
    });

    const curItem = properties[selectedProperty].filter(i => i.text == selectedItem)[0];

    return <Dialog
        isOpen={true}
        sx={{ minWidth: 700 }}
        onDismiss={() => props.onClose()}
        aria-labelledby="header-id"  >
        <Dialog.Header id="header-id">Property Editor (Status)</Dialog.Header>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            <Box sx={{ p: 2 }}>
                <FilterList>
                    {propertyElems}
                    <FilterList.Item href="#baz"><s><PlusCircleIcon /> Add</s></FilterList.Item>
                </FilterList>
            </Box>
            <Box sx={{ p: 2 }}>
                <FilterList>
                    {items}
                    <FilterList.Item onClick={() => dispatch(addStatus())}><PlusCircleIcon /> Add {selectedProperty}</FilterList.Item>
                </FilterList>
            </Box>
            <Box sx={{ p: 2 }}>
                edit
                <ColourPicker
                    selected={curItem ? curItem.colour : undefined}
                    onSelect={(c) => dispatch(setStatusColour({ status: curItem ? curItem.text : "", colour: c }))}
                />
                <FormControl sx={{ p: 2 }}>
                    <FormControl.Label>{selectedProperty} Name</FormControl.Label>
                    <TextInput
                        value={curItem ? curItem.text : ""}
                        onChange={evt => {
                            dispatch(renameStatus({ from: curItem.text, to: evt.target.value }));
                            selectItem(evt.target.value)
                        }}
                    />
                </FormControl>
            </Box>
        </Box>
    </Dialog>
}

function ColourPicker(props: { selected: string, onSelect: (colour: string) => void }) {
    // TODO make an actual class for these items
    return <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }} className="colour-picker">
        {COLOUR_LIST.map((c,i) => <Box key={i} sx={{ height: 20, backgroundColor: c}} onClick={() => props.onSelect(c)}>{props.selected == c ? <CheckIcon /> : null}</Box>)}
    </Box>
}

// TODO - count usages of statuses within all tasks. let user delete if there are zero
