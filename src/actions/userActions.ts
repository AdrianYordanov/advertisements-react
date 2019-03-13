import * as Api from "../api/userApi";
import history from "../utils/browserHistory";
import { IReduxAction, IUser, IUserState } from "../utils/contracts";
import { removeCookies, setCookies } from "../utils/cookies";
import httpResponseHandler from "../utils/httpResponseHandler";
import * as Types from "./types/userTypes";

export const registerUser = (inputUser: IUser) => (
  dispatch: (action: IReduxAction) => void
) => {
  Api.registerRequest(inputUser)
    .then(res => userLoggedSuccess(res, dispatch))
    .catch(err => {
      const { status, data } = err.response;
      httpResponseHandler(status, data.message, dispatch);
    });
};

export const loginUser = (inputUser: IUser) => (
  dispatch: (action: IReduxAction) => void
) => {
  Api.loginRequest(inputUser)
    .then(res => userLoggedSuccess(res, dispatch))
    .catch(err => {
      const { status, data } = err.response;
      httpResponseHandler(status, data.message, dispatch);
    });
};

export const logoutUser = () => (dispatch: (action: IReduxAction) => void) => {
  removeCookies();
  history.push("/");
  dispatch({
    type: Types.LOGOUT_USER
  });
};

// Handlers
const userLoggedSuccess = (
  res: any,
  dispatch: (action: IReduxAction) => void
) => {
  const { username, token, message, cookiesExpInHours } = res.data;
  const user: IUserState = { username, token };
  setCookies(user, cookiesExpInHours);
  httpResponseHandler(res.status, message, dispatch);
  history.push("/advertisements/my");
  dispatch({
    payload: { username, token },
    type: Types.LOGIN_USER
  });
};
