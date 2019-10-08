import * as Types from "./types";
import { getToken, getUsername } from "src/middleware/cookies";
import { IReduxAction, IUserState } from "src/typeScript/contracts";

const initialState: IUserState = {
  token: getToken(),
  username: getUsername()
};

const userReducer = (state = initialState, action: IReduxAction) => {
  switch (action.type) {
    case Types.LOGIN_USER: {
      const { username, token } = action.payload as IUserState;
      state = { ...state, token, username };
      break;
    }
    case Types.LOGOUT_USER: {
      state = { ...state, token: undefined, username: undefined };
      break;
    }
  }

  return state;
};

export default userReducer;
