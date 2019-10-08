import * as React from "react";
import { Route, Router } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";

// Sidebar
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/Footer/Footer";
// Pages
import Home from "./pages/Home/Home";
import Contacts from "./pages/Contacts/Contacts";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MyAdvertisements from "./pages/MyAdvertisements/MyAdvertisements";
import AllAdvertisements from "./pages/AllAdvertisements/AllAdvertisements";
import CreateAdvertisement from "./pages/CreateAdvertisement/CreateAdvertisement";

import history from "./middleware/browserHistory";
import { IAppState } from "./typeScript/contracts";

export interface IProps {
  token?: string;
}

class App extends React.Component<IProps> {
  public render() {
    return (
      <Router history={history}>
        <React.Fragment>
          <NavigationBar />
          <main id="root" style={{ marginBottom: 65 }}>
            <Route exact={true} path="/" component={Home} />
            <Route
              exact={true}
              path="/advertisements"
              component={AllAdvertisements}
            />
            <Route path="/contacts" component={Contacts} />
            {this.getAppropirateRoutes()}
          </main>
          <Footer />
          <ToastContainer />
        </React.Fragment>
      </Router>
    );
  }

  // Conditional routing.
  private getAppropirateRoutes = () => {
    return this.props.token ? (
      <React.Fragment>
        <Route path="/advertisements/my" component={MyAdvertisements} />
        <Route path="/advertisements/create" component={CreateAdvertisement} />
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
const mapStateToProps = (state: IAppState) => {
  return { token: state.user.token };
};

export default connect(
  mapStateToProps,
  undefined
)(App);
