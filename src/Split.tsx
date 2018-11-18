import * as React from "react";
import "./Split.css";
import { millisecondsToString } from "./TimeUtils";

interface ISplitProps {
  name: string;
  time: number;
}

/**
 * Component that displays a split.
 *
 * @class Split
 * @extends {React.Component<ISplitProps>}
 */
class Split extends React.Component<ISplitProps> {
  public render() {
    return (
      <div className="split">
        <span className="split-title">{this.props.name}</span>
        <span className="split-time">
          {millisecondsToString(this.props.time)}
        </span>
      </div>
    );
  }
}

export default Split;
