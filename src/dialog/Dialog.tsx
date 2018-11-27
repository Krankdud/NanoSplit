import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import "./Dialog.css";

interface IDialogProps {
  onClose: () => void;
  isOpen: boolean;
}

class Dialog extends React.Component<IDialogProps> {
  public render() {
    const className = this.props.isOpen
      ? "modal modal-active"
      : "modal modal-inactive";
    return (
      <div className={className}>
        <div className="modal-header">
          <div className="modal-close" onClick={this.props.onClose}>
            <FontAwesomeIcon icon="times" />
          </div>
          Title
        </div>
        <div className="modal-content">Content</div>
      </div>
    );
  }
}

export default Dialog;
