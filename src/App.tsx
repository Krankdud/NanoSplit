import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import "./App.css";

import Menu from "./menu/Menu";
import Split from "./Split";
import Timer from "./Timer";

library.add(faBars, faTimes);

interface IAppState {
  startTime: number;
}

class App extends React.Component<{}, IAppState> {
  public render() {
    return (
      <div className="App">
        <div>
          <Menu />
          <span className="title">Title</span>
        </div>
        <Timer />
        <Split name="Split title" time={0} />
        <Split name="Split title" time={6000} />
        <Split name="Split title" time={9000} />
        <Split name="Split title" time={60000} />
        <Split name="Split title" time={240000} />
        <Split name="Split title" time={480000} />
        <div className="controls">
          <button className="controls-button">Undo</button>
          <button className="controls-button">Skip</button>
          <button className="controls-button">Reset</button>
          <button className="controls-button">Start</button>
        </div>
      </div>
    );
  }
}

export default App;
