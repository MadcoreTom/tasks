// import { State } from "./store";

// /**
//  * Create a "default" node at 0,0
//  */
// export const addNodeReducer = (state: State) => {

//     const fieldValues: { [id: string]: string } = {}
//     Object.entries(state.fields).forEach(([name, type]) => {
//         fieldValues[name] = type == "text" ? "" : state.dataTypes[type][0].value; // TODO potential error where a data type does not have an initial value
//     });

//     const newNode: NodeType = {
//         x: 0,
//         y: 0,
//         fieldValues
//     }

//     state.nodes = [...state.nodes, newNode];
//     state.selected = { type: "task", idx: state.nodes.length - 1 };
// }

// /**
//  * Remove a node by  index
//  */
// export const removeNodeReducer = (state: State, action: { payload: number }) => {
//     console.log("Remove")
//     state.nodes = [...state.nodes];
//     // state.nodes.splice(action.payload,1);
//     state.nodes[action.payload] = null;
//     state.selected = null;
// }