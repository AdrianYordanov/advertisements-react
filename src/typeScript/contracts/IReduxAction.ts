import IUserState from "./IUserState";
import IAdvertisement from "./IAdvertisement";

export default interface IReduxAction {
  type: string;
  payload?: IUserState | IAdvertisement | IAdvertisement[];
}
