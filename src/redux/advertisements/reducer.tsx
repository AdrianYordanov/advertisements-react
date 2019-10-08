import * as Types from "./types";
import {
  IAdvertisement,
  IAdvertisementsState,
  IReduxAction
} from "src/typeScript/contracts";

const initialState: IAdvertisementsState = {
  publicAdvertisements: [],
  userAdvertisements: [],
  loader: false
};

const advertisementsReducer = (state = initialState, action: IReduxAction) => {
  switch (action.type) {
    case Types.LOADING_ADVERTISEMENTS: {
      state = {
        ...state,
        loader: true
      };
      break;
    }
    case Types.FETCH_ALL_ADVERTISEMENTS: {
      state = {
        ...state,
        loader: false,
        publicAdvertisements: action.payload as IAdvertisement[]
      };
      break;
    }
    case Types.FETCH_USER_ADVERTISEMENTS: {
      state = {
        ...state,
        loader: false,
        userAdvertisements: action.payload as IAdvertisement[]
      };
      break;
    }
  }

  return state;
};

export default advertisementsReducer;
