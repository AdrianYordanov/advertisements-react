import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";

// External
import { toast, ToastContainer } from "react-toastify";

// Cookies
import { getToken, removeCookies, setCookies } from "./utils/Cookies";

// Contracts
import { IAdvertisement, IUser } from "./utils/Contracts";

// API
import * as AdvertisementsApi from "./api/AdvertisementsApi";
import * as usersApi from "./api/UsersApi";

// Components
import PublicAdvertisements from "./components/advertisements/Public/PublicAdvertisements";
import UserAdvertisements from "./components/advertisements/User/UserAdvertisements";
import Footer from "./components/bars/Footer";
import Header from "./components/bars/Header";
import Contacts from "./components/forms/Contacts";
import Login from "./components/forms/Login";
import PostAdvertisement from "./components/forms/PostAdvertisement";
import Register from "./components/forms/Register";

export interface IState {
  isUserLogged: boolean;
  publicAdvertisements: IAdvertisement[];
  userAdvertisements: IAdvertisement[];
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isUserLogged: false,
      publicAdvertisements: [],
      userAdvertisements: []
    };
  }

  public componentWillMount = () => {
    this.validateUser();
  };

  public render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header
            onLogout={this.logoutHandler}
            isUserLogged={this.state.isUserLogged}
          />
          <Route
            exact={true}
            path="/"
            component={this.publicAdvertisementsComponent}
          />
          <Route path="/contacts" component={Contacts} />
          {this.getAppropirateRoutes()}
          <Footer />
          <ToastContainer />
        </React.Fragment>
      </BrowserRouter>
    );
  }

  // Conditional routing.
  private getAppropirateRoutes = () => {
    return this.state.isUserLogged ? (
      <React.Fragment>
        <Route
          path="/myAdvertisements"
          component={this.userAdvertisementsComponent}
        />
        <Route
          path="/createAdvertisement"
          component={this.postAdvertisementComponent}
        />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Route path="/login" component={this.loginComponent} />
        <Route path="/register" component={this.registerComponent} />
      </React.Fragment>
    );
  };

  // Components with props.
  private loginComponent = () => {
    return <Login loginUser={this.loginUser} />;
  };
  private registerComponent = () => {
    return <Register registerUser={this.registerUser} />;
  };
  private publicAdvertisementsComponent = () => {
    return (
      <PublicAdvertisements
        data={this.state.publicAdvertisements}
        getAdvertisements={this.getPublicAdvertisements}
      />
    );
  };
  private userAdvertisementsComponent = () => {
    return (
      <UserAdvertisements
        data={this.state.userAdvertisements}
        getAdvertisements={this.getUserAdvertisements}
        deleteAdvertisement={this.deleteAdvertisement}
      />
    );
  };
  private postAdvertisementComponent = () => {
    return <PostAdvertisement postAdvertisement={this.postAdvertisement} />;
  };

  // Handlers
  private publicAdvertisementsHandler = (Advertisements: IAdvertisement[]) => {
    this.setState({ publicAdvertisements: Advertisements });
  };
  private userAdvertisementsHandler = (Advertisements: IAdvertisement[]) => {
    this.setState({ userAdvertisements: Advertisements });
  };
  private loginHandler = (username: string, token: string) => {
    setCookies(username, token);
    window.location.assign("/");
    this.isUserLoggedHandler(true);
  };
  private logoutHandler = () => {
    removeCookies();
    window.location.assign("/");
    this.isUserLoggedHandler(false);
  };
  private isUserLoggedHandler = (isUserLogged: boolean) => {
    this.setState({ isUserLogged });
  };
  private httpHandler = (statusCode: number, message: string) => {
    toast(`${statusCode} - ${message}`);
    if (statusCode === 403) {
      setTimeout(this.logoutHandler, 6000);
    }
  };

  // Requests to user collection.
  private validateUser = () => {
    if (getToken()) {
      usersApi
        .checkUserTokenRequest()
        .then(res => {
          this.isUserLoggedHandler(true);
        })
        .catch(err => {
          const { response } = err;
          this.httpHandler(response.status, response.data.message);
        });
    }
  };
  private loginUser = (inputUser: IUser) => {
    usersApi
      .loginRequest(inputUser)
      .then(res => {
        const { data, status } = res;
        this.httpHandler(status, data.message);
        this.loginHandler(data.username, data.token);
      })
      .catch(err => {
        const { response } = err;
        this.httpHandler(response.status, response.data.message);
      });
  };
  private registerUser = (inputUser: IUser) => {
    usersApi
      .registerRequest(inputUser)
      .then(res => {
        const { data, status } = res;
        this.httpHandler(status, data.message);
        this.loginHandler(data.username, data.token);
      })
      .catch(err => {
        const { response } = err;
        this.httpHandler(response.status, response.data.message);
      });
  };

  // Requests to advertisements collection.
  private getUserAdvertisements = () => {
    AdvertisementsApi.getUserAdvertisementsRequest()
      .then(res => {
        this.userAdvertisementsHandler(res.data.advertisements);
        this.httpHandler(res.status, res.data.message);
      })
      .catch(err => {
        const { response } = err;
        this.httpHandler(response.status, response.data.message);
      });
  };
  private getPublicAdvertisements = () => {
    AdvertisementsApi.getPublicAdvertisementsRequest()
      .then(res => {
        this.publicAdvertisementsHandler(res.data.advertisements);
        this.httpHandler(res.status, res.data.message);
      })
      .catch(err => {
        const { response } = err;
        this.httpHandler(response.status, response.data.message);
      });
  };
  private postAdvertisement = (advertisement: FormData) => {
    AdvertisementsApi.postAdvertisementRequest(advertisement)
      .then(res => {
        this.httpHandler(res.status, res.data.message);
        window.location.assign("/myAdvertisements");
      })
      .catch(err => {
        const { response } = err;
        this.httpHandler(response.status, response.data.message);
      });
  };
  private deleteAdvertisement = (advertisementId: string) => {
    AdvertisementsApi.deleteAdvertisementRequest(advertisementId)
      .then(res => {
        this.httpHandler(res.status, res.data.message);
        this.getUserAdvertisements();
      })
      .catch(err => {
        const { response } = err;
        this.httpHandler(response.status, response.data.message);
      });
  };
}

export default App;
