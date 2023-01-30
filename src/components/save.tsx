import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { exportGraph, importGraph, RootState, setTitle, sort } from "../state/store";
import { ButtonIcon, TextField } from "./bulma";

// export function SaveModal(props: { onClose: () => any }) {
//     const dispatch = useDispatch();
//     const title = useSelector((state : RootState) => state.main.title);

//     return <div className="modal is-active">
//         <div className="modal-background" onClick={props.onClose}></div>
//         <div className="modal-card">
//             <header className="modal-card-head">
//                 <p className="modal-card-title">Save/Load</p>
//                 <button className="delete" aria-label="close" onClick={props.onClose} />
//             </header>
//             <section className="modal-card-body">
//                 <div className="columns">
//                     <div className="column">
//                         <h2 className="subtitle">Save</h2>
//                         <p>Save files to your computer, and share them with others or open them later</p>
//                         <TextField label="File Name" value={title} onChange={e=>dispatch(setTitle(e))}/>
//                         <ButtonIcon text="Download" buttonClass="is-info" iconCode={'\uE802'} onClick={() => dispatch(exportGraph())} />
//                     </div>
//                     <div className="column">
//                         <h2 className="subtitle">Load</h2>
//                         <p>Upload files from your computer and continue working on them</p>
//                         <div className="file is-info">
//                             <label className="file-label">
//                                 <input className="file-input" type="file" name="resume" onChange={evt => loadFile(evt, data => {dispatch(importGraph({data,title:evt.target.files[0].name})); props.onClose()})} />
//                                 <span className="file-cta">
//                                     <span className="icon is-small">
//                                         <i>{'\ue803'}</i>
//                                     </span>
//                                     <span className="file-label">
//                                         &nbsp;Upload
//                                     </span>
//                                 </span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     </div>
// }

// function loadFile(evt: React.ChangeEvent<HTMLInputElement>, callback: (data: string) => any) {
//     if (evt.target.files) {
//         var reader = new FileReader();
//         reader.onload = function (evt) {
//             if (!evt.target || evt.target.readyState != 2) return;
//             if (evt.target.error) {
//                 alert('Error while reading file');
//                 return;
//             }
//             if (evt.target.result) {
//                 callback(evt.target.result.toString());
//             }
//         };
//         reader.readAsText(evt.target.files[0]);
//     }
// }