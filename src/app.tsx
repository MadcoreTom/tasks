import * as React from "react";
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux'
import store, { RootState, } from "./state/store";
import { ControlPanel } from "./components/controlpanel";
import { Panel } from "./components/panel";
import { Graph } from "./components/graph";
import { TableMode } from "./table/table";
import { Tips } from "./components/tips";
import { BrowserSaveContainer } from "./components/save";
import {ThemeProvider} from '@primer/react'


function App() {
    const viewMode = useSelector((state: RootState) => state.main.viewMode);

    return <ThemeProvider><div className="main">
    <Panel />
        {viewMode == 'graph' ? <Graph /> : null}
        {viewMode == 'table' ? <TableMode /> : null}
        <ControlPanel />
        <Tips />
        <BrowserSaveContainer/>
    </div></ThemeProvider>
}


createRoot(document.querySelector("#root") as HTMLElement)
    .render(<Provider store={store}><App /></Provider>,);