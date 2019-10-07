import * as Api from "../api/advertisements";
import history from "../middleware/browserHistory";
import httpResponseHandler from "../middleware/httpResponseHandler";
import { IAdvertisement } from "../typeScript/contracts/contracts";
import * as Types from "./types/advertisementsTypes";

export const loadingAdvertisements = () => {
  return { type: Types.LOADING_ADVERTISEMENTS };
}

export const fetchPublicAdvertisements = () => (dispatch: any) => {
  dispatch(loadingAdvertisements());
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
}

export const fetchUserAdvertisements = () => (dispatch: any) => {
  dispatch(loadingAdvertisements());
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

export const postAdvertisement = (advertisement: FormData) => (dispatch: any) => {
  Api.postAdvertisementRequest(advertisement)
    .then(res => {
      httpResponseHandler(res.status, res.data.message, dispatch);
      history.push("/advertisements/my");
    })
    .catch(err => {
      const { status, data } = err.response;
      httpResponseHandler(status, data.message, dispatch);
    });
};

export const deleteAdvertisement = (id: string) => (dispatch: any) => {
  Api.deleteAdvertisementRequest(id).then(res => {
    httpResponseHandler(res.status, res.data.message, dispatch);
    fetchUserAdvertisements()(dispatch);
  })
    .catch(err => {
      const { status, data } = err.response;
      httpResponseHandler(status, data.message, dispatch);
    });
};
