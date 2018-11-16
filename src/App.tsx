import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import "./App.css";

import Menu from "./menu/Menu";

library.add(faBars, faTimes);

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div>
          <Menu />
          <span>Title</span>
        </div>
      </div>
    );
  }
}

export default App;
