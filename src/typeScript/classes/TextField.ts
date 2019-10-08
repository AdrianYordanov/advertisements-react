import Field from "./Field";

export default class TextField extends Field {
  constructor(
    message: string,
    public pattern: RegExp,
    public value: string = ""
  ) {
    super(message);
  }

  public validateField = () => {
    const { value, pattern } = this;
    return pattern.test(value);
  };
}
