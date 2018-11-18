import * as React from "react";
import "./Split.css";

class Split extends React.Component {
  public render() {
    return (
      <div className="split">
        <span className="split-title">Split title</span>
        <span className="split-time">1:23</span>
      </div>
    );
  }
}

export default Split;
