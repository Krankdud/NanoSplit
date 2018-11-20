import * as React from "react";
import ISegment from "./models/Segment";
import "./Split.css";
import { millisecondsToString } from "./TimeUtils";

interface ISplitProps {
  segment: ISegment;
  currentTime: number;
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
      time = millisecondsToString(this.props.segment.pbTime, false);
    }

    return (
      <div className="split">
        <span className="split-title">{this.props.segment.title}</span>
        <span className="split-time">{time}</span>
      </div>
    );
  }
}

export default Split;
