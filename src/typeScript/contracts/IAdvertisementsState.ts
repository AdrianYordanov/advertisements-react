import IAdvertisement from "./IAdvertisement";

export default interface IAdvertisementsState {
  publicAdvertisements: IAdvertisement[];
  userAdvertisements: IAdvertisement[];
  lastCreated?: IAdvertisement;
  loader: boolean;
}
