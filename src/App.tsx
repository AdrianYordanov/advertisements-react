import * as React from "react";
import { Route, Router } from "react-router-dom";

import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";

import PublicAdvertisements from "./components/advertisements/Public/PublicAdvertisements";
import UserAdvertisements from "./components/advertisements/User/UserAdvertisements";
import Contacts from "./components/forms/Contacts";
import Login from "./components/forms/Login";
import PostAdvertisement from "./components/forms/PostAdvertisement";
import Register from "./components/forms/Register";
import Home from "./components/home/Home";
import Footer from "./components/navigations/Footer";
import Header from "./components/navigations/Header";
import history from "./utils/browserHistory";
import { IReduxState } from "./utils/contracts";

export interface IProps {
  token?: string;
}

class App extends React.Component<IProps> {
  public render() {
    return (
      <Router history={history}>
        <React.Fragment>
          <Header />
          <Route exact={true} path="/" component={Home} />
          <Route
            exact={true}
            path="/advertisements"
            component={PublicAdvertisements}
          />
          <Route path="/contacts" component={Contacts} />
          {this.getAppropirateRoutes()}
          <ToastContainer />
          <Footer />
        </React.Fragment>
      </Router>
    );
  }

  // Conditional routing.
  private getAppropirateRoutes = () => {
    return this.props.token ? (
      <React.Fragment>
        <Route path="/advertisements/my" component={UserAdvertisements} />
        <Route path="/advertisements/create" component={PostAdvertisement} />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </React.Fragment>
    );
  };
}

// Mapping
const mapStateToProps = (state: IReduxState) => {
  return { token: state.user.token };
};

export default connect(
  mapStateToProps,
  undefined
)(App);
