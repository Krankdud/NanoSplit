import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import "./Dialog.css";
import IDialogOptions, { DialogType } from "./DialogOptions";

interface IDialogProps {
  isOpen: boolean;
  onClose: () => void;
  options: IDialogOptions;
}

class Dialog extends React.Component<IDialogProps> {
  public render() {
    let dialogClass = "dialog";
    let headerClass = "dialog-header";
    if (this.props.options.type === DialogType.Fullscreen) {
      dialogClass = "dialog-fullscreen";
      headerClass += " dialog-header-fullscreen";
    }
    if (!this.props.isOpen) {
      dialogClass += " dialog-inactive";
    } else if (this.props.options.type === DialogType.Fullscreen) {
      dialogClass += " dialog-active-fullscreen";
    } else {
      dialogClass += " dialog-active";
    }

    return (
      <div>
        {this.props.options.type === DialogType.Modal && this.props.isOpen && (
          <div className="dialog-background" />
        )}
        <div className={dialogClass}>
          <div className={headerClass}>
            {this.props.options.showCloseButton && (
              <div className="dialog-close" onClick={this.props.onClose}>
                <FontAwesomeIcon icon="times" />
              </div>
            )}
            {this.props.options.title}
          </div>
          <div className="dialog-content">{this.props.children}</div>
          {this.renderFooter()}
        </div>
      </div>
    );
  }

  private renderFooter() {
    if (
      !this.props.options.showConfirmButton &&
      !this.props.options.showCancelButton
    ) {
      return;
    }

    let cancelButton;
    if (this.props.options.showCancelButton) {
      cancelButton = (
        <span
          className="dialog-footer-button"
          onClick={this.props.options.onCancel}
        >
          Cancel
        </span>
      );
    }

    let confirmButton;
    if (this.props.options.showConfirmButton) {
      confirmButton = (
        <span
          className="dialog-footer-button"
          onClick={this.props.options.onConfirm}
        >
          Confirm
        </span>
      );
    }

    return (
      <div className="dialog-footer">
        {cancelButton}
        {confirmButton}
      </div>
    );
  }
}

export default Dialog;
