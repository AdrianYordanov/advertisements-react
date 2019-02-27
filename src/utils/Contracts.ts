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

export interface ITextFieldConfiguration {
  fieldType: string;
  value: string;
  pattern?: RegExp;
  message: string;
}
