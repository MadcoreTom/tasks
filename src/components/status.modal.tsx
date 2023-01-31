import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStatus, removeStatus, renameStatus, RootState, setStatusColour } from "../state/store";
import { ButtonIcon } from "./bulma";
import { ColourPicker } from "./colour.picker";

function StatusModalRow(props: { status: { text: string, colour: string }, idx: number, statusCount:number }) {
    const dispatch = useDispatch();
    const { text, colour } = props.status;
    return <tr key={props.idx}>
        <td><input className="input" type="text" value={text} onChange={evt => dispatch(renameStatus({ from: text, to: evt.target.value }))} /></td>
        <td style={{ verticalAlign: "middle" }}>
            <ColourPicker value={colour} setValue={newColour => dispatch(setStatusColour({ status: text, colour: newColour }))} />
        </td>
        <td style={{ verticalAlign: "middle", textAlign: "center" }}><label className="checkbox">
            {props.statusCount == 0 ? <ButtonIcon text="Remove" buttonClass="is-small is-light is-danger" iconCode="x" onClick={() => dispatch(removeStatus(text))} /> : props.statusCount}
        </label></td>
    </tr>
}

export function StatusesModal(props: { onClose: () => any }) {
    const dispatch = useDispatch();
    const statuses = useSelector((state: RootState) => state.main.statuses);
    const tasks = useSelector((state: RootState) => state.main.tasks);


    const rows = statuses.map((status, idx) => <StatusModalRow status={status} idx={idx} statusCount={tasks.filter(t => t.status == status.text).length} />)


    return <div className="modal is-active">
        <div className="modal-background" onClick={props.onClose}></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Statuses</p>
                <button className="delete" aria-label="close" onClick={props.onClose} />
            </header>
            <section className="modal-card-body">
                <div className="table-container">
                    <table className="table" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Colour</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                            <tr>
                                <td colSpan={3}>
                                    <ButtonIcon text="Add Status" iconCode="+" onClick={() => dispatch(addStatus())} buttonClass="is-fullwidth is-small" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </div>
}