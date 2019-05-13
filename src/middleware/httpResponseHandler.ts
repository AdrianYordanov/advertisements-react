import { toast } from "react-toastify";

import { logoutUser } from "../actions/user";
import { IReduxAction } from "../typeScript/contracts/contracts";

const httpResponseHandler = (
  statusCode: number,
  message: string,
  dispatch: (action: IReduxAction) => void,
  showMessage: boolean = true
) => {
  if (showMessage) {
    toast(`${statusCode} - ${message}`);
  }

  if (statusCode === 403) {
    logoutUser()(dispatch);
  }
};

export default httpResponseHandler;
