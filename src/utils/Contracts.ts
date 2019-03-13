export interface IUser {
  username: string;
  password: string;
}

export interface IAdvertisement {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  owner: string;
}

export interface IUserState {
  username?: string;
  token?: string;
}

export interface IAdvertisementsState {
  publicAdvertisements: IAdvertisement[];
  userAdvertisements: IAdvertisement[];
  lastCreated?: IAdvertisement;
}

export interface IRouteHistoryState {
  current: string;
  previous: string[];
}

export interface IReduxState {
  user: IUserState;
  advertisements: IAdvertisementsState;
  routesHistory: IRouteHistoryState;
}

export interface IReduxAction {
  type: string;
  payload?: any;
}

export interface ITextFieldConfiguration {
  fieldType: string;
  value: string;
  pattern?: RegExp;
  message: string;
}

export interface ILinkConfig {
  href: string;
  title: string;
  needAuth?: boolean;
}
