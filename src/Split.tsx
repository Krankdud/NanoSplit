import * as React from "react";
import Constants from "./Constants";
import ISegment from "./models/Segment";
import "./Split.css";
import "./TimerColors.css";
import { millisecondsToString } from "./TimeUtils";

interface ISplitProps {
  currentTime: number;
  isCurrentSplit: boolean;
  prevSegment?: ISegment;
  prevTotalTime?: number;
  segment: ISegment;
  totalTime?: number;
}

/**
 * Component that displays a split.
 *
 * @class Split
 * @extends {React.Component<ISplitProps>}
 */
class Split extends React.Component<ISplitProps> {
  public render() {
    let divClass = "split";
    if (this.props.isCurrentSplit) {
      divClass += " split-active";
    }

    return (
      <div className={divClass}>
        <span className="split-title">{this.props.segment.title}</span>
        <span className={"split-time " + this.getSplitColor()}>
          {this.getTimeString()}
        </span>
      </div>
    );
  }

  private getTimeString = () => {
    let time: string = "-";
    if (this.props.totalTime === Constants.SKIPPED) {
      time = "-";
    } else if (this.props.totalTime) {
      if (this.props.segment.pbTime) {
        // Display the delta if there is a time for this segment in the user's PB
        const delta = this.props.totalTime - this.props.segment.pbTime;
        time =
          (delta > 0 ? "+" : "-") +
          millisecondsToString(Math.abs(delta), false);
      } else {
        time = millisecondsToString(this.props.totalTime, false);
      }
    } else if (this.props.segment.pbTime) {
      if (
        this.props.isCurrentSplit &&
        this.props.currentTime > this.props.segment.pbTime
      ) {
        // Display current time loss if this is the current split and the user is losing time
        const delta = this.props.currentTime - this.props.segment.pbTime;
        time = "+" + millisecondsToString(delta, false);
      } else {
        time = millisecondsToString(this.props.segment.pbTime, false);
      }
    }
    return time;
  };

  private getSplitColor = () => {
    if (
      (!this.props.isCurrentSplit && !this.props.totalTime) ||
      this.props.totalTime === Constants.SKIPPED ||
      !this.props.segment.pbTime
    ) {
      return "";
    }

    if (
      this.props.segment.bestTime &&
      this.props.totalTime &&
      this.props.prevTotalTime &&
      this.props.prevTotalTime !== Constants.SKIPPED &&
      this.props.totalTime - this.props.prevTotalTime <
        this.props.segment.bestTime
    ) {
      return "best-segment";
    }

    const time = this.props.totalTime || this.props.currentTime;
    const isAhead = time < this.props.segment.pbTime;
    let isGainingTime = isAhead;

    if (
      this.props.prevSegment &&
      this.props.prevSegment.pbTime &&
      this.props.prevSegment.pbTime !== Constants.SKIPPED &&
      this.props.prevTotalTime &&
      this.props.prevTotalTime !== Constants.SKIPPED
    ) {
      isGainingTime =
        time - this.props.prevTotalTime <
        this.props.segment.pbTime - this.props.prevSegment.pbTime;
    }

    if (isAhead) {
      if (!this.props.totalTime && isGainingTime) {
        return "";
      }

      return isGainingTime ? "ahead-gaining-time" : "ahead-losing-time";
    } else {
      return isGainingTime ? "behind-gaining-time" : "behind-losing-time";
    }
  };
}

export default Split;
