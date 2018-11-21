import * as React from "react";
import Constants from "./Constants";
import ISegment from "./models/Segment";
import "./Split.css";
import { millisecondsToString } from "./TimeUtils";

interface ISplitProps {
  segment: ISegment;
  currentTime: number;
  isCurrentSplit: boolean;
  segmentTime?: number;
}

/**
 * Component that displays a split.
 *
 * @class Split
 * @extends {React.Component<ISplitProps>}
 */
class Split extends React.Component<ISplitProps> {
  public render() {
    let time: string = "-";
    if (this.props.segmentTime === Constants.SKIPPED) {
      time = "-";
    } else if (this.props.segmentTime) {
      if (this.props.segment.pbTime) {
        // Display the delta if there is a time for this segment in the user's PB
        const delta = this.props.segmentTime - this.props.segment.pbTime;
        time =
          (delta > 0 ? "+" : "-") +
          millisecondsToString(Math.abs(delta), false);
      } else {
        time = millisecondsToString(this.props.segmentTime, false);
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

    let divClass = "split";
    if (this.props.isCurrentSplit) {
      divClass += " split-active";
    }

    return (
      <div className={divClass}>
        <span className="split-title">{this.props.segment.title}</span>
        <span className="split-time">{time}</span>
      </div>
    );
  }
}

export default Split;
