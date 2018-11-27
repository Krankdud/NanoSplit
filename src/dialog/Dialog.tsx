import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import "./Dialog.css";

interface IDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

class Dialog extends React.Component<IDialogProps> {
  public render() {
    const className = this.props.isOpen
      ? "dialog dialog-active"
      : "dialog dialog-inactive";
    return (
      <div className={className}>
        <div className="dialog-header">
          <div className="dialog-close" onClick={this.props.onClose}>
            <FontAwesomeIcon icon="times" />
          </div>
          {this.props.title}
        </div>
        <div className="dialog-content">{this.props.children}</div>
      </div>
    );
  }
}

export default Dialog;
