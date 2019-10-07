import * as Api from "../api/user";
import history from "../middleware/browserHistory";
import { removeCookies, setCookies } from "../middleware/cookies";
import httpResponseHandler from "../middleware/httpResponseHandler";
import {
  IReduxAction,
  IUserForm,
  IUserState
} from "../typeScript/contracts/contracts";
import * as Types from "./types/userTypes";

export const registerUser = (inputUser: IUserForm) => (
  dispatch: (action: IReduxAction) => void
) => {
  Api.registerRequest(inputUser)
    .then(res => userLoggedSuccess(res, dispatch))
    .catch(err => {
      const { status, data } = err.response;
      httpResponseHandler(status, data.message, dispatch);
    });
};

export const loginUser = (inputUser: IUserForm) => (
  dispatch: (action: IReduxAction) => void
) => {
  Api.loginRequest(inputUser)
    .then(res => userLoggedSuccess(res, dispatch))
    .catch(err => {
      const { status, data } = err.response;
      httpResponseHandler(status, data.message, dispatch);
    });
};

export const logoutUser = () => {
  removeCookies();
  history.push("/");
  return {
    type: Types.LOGOUT_USER
  };
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
