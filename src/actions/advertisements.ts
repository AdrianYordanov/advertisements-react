import * as Api from "../api/advertisements";
import history from "../middleware/browserHistory";
import httpResponseHandler from "../middleware/httpResponseHandler";
import {
  IAdvertisement,
  IReduxAction
} from "../typeScript/contracts/contracts";
import * as Types from "./types/advertisementsTypes";

export const fetchPublicAdvertisements = () => (
  dispatch: (action: IReduxAction) => void
) => {
  Api.getPublicAdvertisementsRequest()
    .then(res => {
      dispatch({
        payload: res.data.advertisements as IAdvertisement[],
        type: Types.FETCH_PUBLIC_ADVERTISEMENTS
      });
      httpResponseHandler(res.status, res.data.message, dispatch, false);
    })
    .catch(err => {
      const { status, data } = err.response;
      httpResponseHandler(status, data.message, dispatch);
    });
};

export const fetchUserAdvertisements = () => (
  dispatch: (action: IReduxAction) => void
) => {
  Api.getUserAdvertisementsRequest()
    .then(res => {
      dispatch({
        payload: res.data.advertisements as IAdvertisement[],
        type: Types.FETCH_USER_ADVERTISEMENTS
      });
      httpResponseHandler(res.status, res.data.message, dispatch, false);
    })
    .catch(err => {
      const { status, data } = err.response;
      httpResponseHandler(status, data.message, dispatch);
    });
};

export const postAdvertisement = (advertisement: FormData) => (
  dispatch: (action: IReduxAction) => void
) => {
  Api.postAdvertisementRequest(advertisement)
    .then(res => {
      dispatch({
        payload: res.data.advertisement as IAdvertisement,
        type: Types.SET_LAST_CREATED_ADVERTISEMENT
      });
      httpResponseHandler(res.status, res.data.message, dispatch);
      history.push("/advertisements/my");
    })
    .catch(err => {
      const { status, data } = err.response;
      httpResponseHandler(status, data.message, dispatch);
    });
};

export const deleteAdvertisement = (id: string) => (
  dispatch: (action: IReduxAction) => void
) => {
  Api.deleteAdvertisementRequest(id)
    .then(res => {
      httpResponseHandler(res.status, res.data.message, dispatch);
      fetchUserAdvertisements()(dispatch);
    })
    .catch(err => {
      const { status, data } = err.response;
      httpResponseHandler(status, data.message, dispatch);
    });
};