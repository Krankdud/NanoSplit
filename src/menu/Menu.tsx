import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import "./Menu.css";

interface IMenuProps {
  closeCallback: () => void;
  isOpen: boolean;
  openCallback: () => void;
}

class Menu extends React.Component<IMenuProps> {
  public render() {
    const sidenavClass = this.props.isOpen
      ? "sidenav sidenav-active"
      : "sidenav sidenav-inactive";
    return (
      <div>
        <div className={sidenavClass}>
          <div className="sidenav-close" onClick={this.props.closeCallback}>
            <FontAwesomeIcon icon="times" />
          </div>
          {this.props.children}
        </div>
        <div className="sidenav-menu" onClick={this.props.openCallback}>
          <FontAwesomeIcon icon="bars" />
        </div>
      </div>
    );
  }
}

export default Menu;
