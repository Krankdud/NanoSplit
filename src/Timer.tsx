import * as React from "react";
import Constants from "./Constants";
import ISegment from "./models/Segment";
import "./Timer.css";
import { millisecondsToString } from "./TimeUtils";

interface ITimerProps {
  isFinished: boolean;
  isTiming: boolean;
  prevSegment?: ISegment;
  prevTime?: number;
  segment?: ISegment;
  time: number;
}

class Timer extends React.Component<ITimerProps> {
  public render() {
    const milliseconds = Math.floor((Math.abs(this.props.time) % 1000) / 10);
    let msString = ".";
    if (milliseconds < 10) {
      msString += "0";
    }
    msString += milliseconds;

    return (
      <div className={"timer " + this.getTimerColor()}>
        <span>{millisecondsToString(this.props.time, false)}</span>
        <span className="timer-decimal">{msString}</span>
      </div>
    );
  }

  private getTimerColor() {
    if (
      this.props.time < 0 ||
      (!this.props.isTiming && !this.props.isFinished)
    ) {
      return "";
    }

    if (this.props.segment && this.props.segment.pbTime) {
      const isAhead = this.props.time < this.props.segment.pbTime;
      let isGainingTime = isAhead;

      if (
        this.props.prevSegment &&
        this.props.prevSegment.pbTime &&
        this.props.prevSegment.pbTime !== Constants.SKIPPED &&
        this.props.prevTime &&
        this.props.prevTime !== Constants.SKIPPED
      ) {
        isGainingTime =
          this.props.time - this.props.prevTime <
          this.props.segment.pbTime - this.props.prevSegment.pbTime;
      }

      if (isAhead) {
        if (this.props.isFinished) {
          return "personal-best";
        }
        return isGainingTime ? "ahead-gaining-time" : "ahead-losing-time";
      } else {
        return isGainingTime ? "behind-gaining-time" : "behind-losing-time";
      }
    }

    return this.props.isFinished ? "personal-best" : "";
  }
}

export default Timer;
