import Field from "./Field";

export default class TextField extends Field {
  public value: string;
  public pattern: RegExp;

  constructor(value: string, pattern: RegExp, message: string) {
    super(message);
    this.value = value;
    this.pattern = pattern;
  }

  public validateField = () => {
    const { value, pattern } = this;
    return pattern.test(value);
  };
}
