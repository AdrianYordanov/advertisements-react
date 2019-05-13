import * as Types from "../actions/types/advertisementsTypes";
import {
  IAdvertisement,
  IAdvertisementsState,
  IReduxAction
} from "../typeScript/contracts/contracts";

const initialState: IAdvertisementsState = {
  publicAdvertisements: [],
  userAdvertisements: []
};

const advertisementsReducer = (state = initialState, action: IReduxAction) => {
  switch (action.type) {
    case Types.FETCH_PUBLIC_ADVERTISEMENTS: {
      state = {
        ...state,
        publicAdvertisements: action.payload as IAdvertisement[]
      };
      break;
    }
    case Types.FETCH_USER_ADVERTISEMENTS: {
      state = {
        ...state,
        userAdvertisements: action.payload as IAdvertisement[]
      };
      break;
    }
    case Types.SET_LAST_CREATED_ADVERTISEMENT: {
      state = {
        ...state,
        lastCreated: action.payload as IAdvertisement
      };
      break;
    }
  }

  return state;
};

export default advertisementsReducer;
