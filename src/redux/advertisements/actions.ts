import * as Api from "src/api/advertisements";
import history from "src/middleware/browserHistory";
import httpResponseHandler from "src/middleware/httpResponseHandler";
import { IAdvertisement } from "src/typeScript/contracts";
import * as Types from "./types";

export const loadingAdvertisements = () => {
  return { type: Types.LOADING_ADVERTISEMENTS };
};

export const fetchAllAdvertisements = () => (dispatch: any) => {
  dispatch(loadingAdvertisements());
  Api.getPublicAdvertisementsRequest()
    .then(res => {
      dispatch({
        payload: res.data.advertisements as IAdvertisement[],
        type: Types.FETCH_ALL_ADVERTISEMENTS
      });
      httpResponseHandler(res.status, res.data.message, dispatch, false);
    })
    .catch(err => {
      const { status, data } = err.response;
      httpResponseHandler(status, data.message, dispatch);
    });
};

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

export const postAdvertisement = (advertisement: FormData) => (
  dispatch: any
) => {
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
