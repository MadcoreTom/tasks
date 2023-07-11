import * as React from "react";
import { useDispatch } from "react-redux";
import { importGraph } from "../state/store";
import { Button } from "@primer/react";

export function ImportButton() {
    const dispatch = useDispatch();

    function importFunc(evt) {
        loadFile(evt, data => {
            if(evt && evt.target && evt.target.files && evt.target.files.length >0){
                dispatch(importGraph({ data, title: evt.target.files[0].name }))
            }
        });
    }

    return <Button as="Input" className="file-input" type="file" name="resume" onChange={importFunc}>Import File</Button>
}


function loadFile(evt: React.ChangeEvent<HTMLInputElement>, callback: (data: string) => any) {
    if (evt.target.files) {
        var reader = new FileReader();
        reader.onload = function (evt) {
            if (!evt.target || evt.target.readyState != 2) return;
            if (evt.target.error) {
                alert('Error while reading file');
                return;
            }
            if (evt.target.result) {
                callback(evt.target.result.toString());
            }
        };
        reader.readAsText(evt.target.files[0]);
    }
}