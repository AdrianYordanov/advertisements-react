import IUserState from "./IUserState";
import IAdvertisementsState from "./IAdvertisementsState";

export default interface IAppState {
  user: IUserState;
  advertisements: IAdvertisementsState;
}
