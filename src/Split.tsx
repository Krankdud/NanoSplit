import * as React from "react";
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
    let time = "-";
    if (this.props.segment.pbTime) {
      if (this.props.segmentTime) {
        // Display delta if there is a time for this segment set
        const delta = this.props.segmentTime - this.props.segment.pbTime;
        time =
          (delta > 0 ? "+" : "-") +
          millisecondsToString(Math.abs(delta), false);
      } else if (
        this.props.isCurrentSplit &&
        this.props.currentTime > this.props.segment.pbTime
      ) {
        // Display current time loss if this is the current split and the user is losing time
        const delta = this.props.currentTime - this.props.segment.pbTime;
        time = "+" + millisecondsToString(delta, false);
      } else {
        time = millisecondsToString(this.props.segment.pbTime, false);
      }
    } else if (this.props.segmentTime) {
      time = millisecondsToString(this.props.segmentTime, false);
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
