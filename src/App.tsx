import * as React from "react";
import "./App.css";

import Menu from "./menu/Menu";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Menu />
      </div>
    );
  }
}

export default App;
