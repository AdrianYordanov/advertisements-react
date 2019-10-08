import { toast } from "react-toastify";

import { logoutUser } from "src/redux/user/actions";
import { IReduxAction } from "../typeScript/contracts";

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
    dispatch(logoutUser());
  }
};

export default httpResponseHandler;
