import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import "./Menu.css";

interface IMenuState {
  isOpen: boolean;
}

class Menu extends React.Component<{}, IMenuState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  public openMenu() {
    this.setState({
      isOpen: true
    });
  }

  public closeMenu() {
    this.setState({
      isOpen: false
    });
  }

  public render() {
    const sidenavClass = this.state.isOpen
      ? "sidenav sidenav-active"
      : "sidenav sidenav-inactive";
    return (
      <div>
        <div className={sidenavClass}>
          <div className="sidenav-close" onClick={this.closeMenu}>
            <FontAwesomeIcon icon="times" />
          </div>
          {this.props.children}
        </div>
        <div className="sidenav-menu" onClick={this.openMenu}>
          <FontAwesomeIcon icon="bars" />
        </div>
      </div>
    );
  }
}

export default Menu;
