import * as React from "react";
import { NavLink } from "react-router-dom";

import classNames from "classnames";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/userActions";
import history from "../../utils/browserHistory";
import { ILinkConfig, IReduxState, IUserState } from "../../utils/contracts";

import "./Header.css";

export interface IProps {
  user: IUserState;
  logoutUser: () => void;
}

export interface IState {
  currentRoute: string;
  links: ILinkConfig[];
}

class Header extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentRoute: location.pathname,
      links: [
        { href: "/", title: "Home" },
        { href: "/contacts", title: "Contacts" },
        { href: "/advertisements", title: "Advertisements" },
        { href: "/login", title: "Login", needAuth: false },
        { href: "/register", title: "Register", needAuth: false },
        { href: "/advertisements/my", title: "My ads", needAuth: true },
        { href: "/advertisements/create", title: "Create Ad", needAuth: true }
      ]
    };
  }

  public componentWillMount = () => {
    history.listen(location => {
      this.setState({ currentRoute: location.pathname });
    });
  };

  public render() {
    const { user } = this.props;
    const welcomeMessage = "Welcome" + (user.token ? `, ${user.username}` : "");
    const welcolmeLink = "/advertisements" + (user.token ? "/my" : "");
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <NavLink to={welcolmeLink} className="navbar-brand">
            {welcomeMessage}
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
              {this.state.links
                .filter(
                  link =>
                    typeof link.needAuth === "undefined" ||
                    (typeof link.needAuth !== "undefined" &&
                      link.needAuth === Boolean(user.token))
                )
                .map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.href}
                    className={classNames("nav-link", {
                      activeLink: this.checkLinkIsActive(link.href)
                    })}
                  >
                    {link.title}
                  </NavLink>
                ))}
              {user.token ? (
                <NavLink className="nav-link" to="/" onClick={this.onLogout}>
                  Logout
                </NavLink>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  private checkLinkIsActive = (link: string) => {
    return this.state.currentRoute === link;
  };

  private onLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    this.props.logoutUser();
  };
}

// Mapping
const mapStateToProps = (state: IReduxState) => {
  const { username, token } = state.user;
  return { user: { username, token } };
};
const mapActionsToProps = { logoutUser };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Header);
