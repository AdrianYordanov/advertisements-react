import { toast } from "react-toastify";

import { logoutUser } from "../actions/userActions";
import { IReduxAction } from "./contracts";

const httpResponseHandler = (
  statusCode: number,
  message: string,
  dispatch: (action: IReduxAction) => void,
  showMessage: boolean = true
) => {
  if (statusCode === 403) {
    logoutUser()(dispatch);
  } else if (showMessage) {
    toast(`${statusCode} - ${message}`);
  }
};

export default httpResponseHandler;
