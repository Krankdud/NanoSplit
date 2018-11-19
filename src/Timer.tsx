import * as React from "react";
import "./Timer.css";
import { millisecondsToString } from "./TimeUtils";

interface ITimerProps {
  time: number;
}

class Timer extends React.Component<ITimerProps> {
  public render() {
    const milliseconds = Math.floor((this.props.time % 1000) / 10);
    let msString = ".";
    if (milliseconds < 10) {
      msString += "0";
    }
    msString += milliseconds;

    return (
      <div className="timer">
        <span>{millisecondsToString(this.props.time, false)}</span>
        <span className="timer-decimal">{msString}</span>
      </div>
    );
  }
}

export default Timer;
