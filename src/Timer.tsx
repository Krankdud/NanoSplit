import * as React from "react";
import "./Timer.css";

class Timer extends React.Component {
  public render() {
    return (
      <div className="timer">
        <span>12:00:00</span>
        <span className="timer-decimal">.00</span>
      </div>
    );
  }
}

export default Timer;
