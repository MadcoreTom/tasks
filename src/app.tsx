import * as React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import store from "./state/store";
import { ControlPanel } from "./components/controlpanel";
import { Panel } from "./components/panel";
import { Graph } from "./components/graph";
import { SaveModal } from "./components/save";


function App() {

    return <div className="main">
        <Graph />
        <ControlPanel />
        <Panel />
    </div>
}


createRoot(document.querySelector("#root") as HTMLElement)
    .render(<Provider store={store}><App /></Provider>,);