import * as React from "react";
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux'
import store, { RootState, } from "./state/store";
import { ControlPanel } from "./components/controlpanel";
import { Panel } from "./components/panel";
import { Graph } from "./components/graph";
import { TableMode } from "./table/table";


function App() {
    const viewMode = useSelector((state: RootState) => state.main.viewMode);

    return <div className="main">
        {viewMode == 'graph' ? <Graph /> : null}
        {viewMode == 'table' ? <TableMode /> : null}
        <ControlPanel />
        <Panel />
    </div>
}


createRoot(document.querySelector("#root") as HTMLElement)
    .render(<Provider store={store}><App /></Provider>,);