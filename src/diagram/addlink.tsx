import * as React from "react";
import { useDispatch } from "react-redux";
import { TOP_MARGIN } from "../constants";
import { select } from "../state/store";

export function AddLinkButton(props: {x:number,y:number,isStart:boolean, idx:number}){
    const dispatch = useDispatch();
    const transform = `translate(${props.x-20},${props.y + TOP_MARGIN-20})`
    return <g transform={transform} onClick={()=>dispatch(select({type:"linking", start:props.isStart,idx:props.idx}))} className="hover-circle">
        <circle cx="20" cy="20" r="20" fill="rgba(128,128,128,0.2)"/>
        <path d="M18.042 27.583H11.5q-3.167 0-5.375-2.229T3.917 20q0-3.125 2.208-5.354t5.375-2.229h6.542v2.125H11.5q-2.292 0-3.896 1.583T6 20q0 2.25 1.604 3.854t3.896 1.604h6.542Zm-4.375-6.541v-2.084h12.291v2.084ZM35.708 20h-2.083q0-2.25-1.604-3.854t-3.854-1.604h-6.542v-2.125h6.542q3.125 0 5.333 2.229T35.708 20Zm-6.75 12.917v-5h-5v-2.084h5v-5h2.084v5h5v2.084h-5v5Z"/>
    </g>
}