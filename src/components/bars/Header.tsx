import * as React from "react";
import { NavLink } from "react-router-dom";

// Cookies
import { getUsername } from "../../utils/Cookies";

export interface IProps {
  onLogout: () => void;
  isUserLogged: boolean;
}

class Header extends React.Component<IProps, any> {
  public render() {
    const username = getUsername();
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            Welcome
            {username ? `, ${username}` : ""}
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contacts" className="nav-link">
                  Contacts
                </NavLink>
              </li>
              {this.props.isUserLogged
                ? this.userNavigation()
                : this.publicNavigation()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  private publicNavigation = () => {
    return (
      <React.Fragment>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/register" className="nav-link">
            Register
          </NavLink>
        </li>
      </React.Fragment>
    );
  };

  private userNavigation = () => {
    return (
      <React.Fragment>
        <li className="nav-item">
          <NavLink to="/myAdvertisements" className="nav-link">
            My Advertisements
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/createAdvertisement" className="nav-link">
            Create Advertisements
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link" onClick={this.props.onLogout}>
            Logout
          </NavLink>
        </li>
      </React.Fragment>
    );
  };
}

export default Header;
