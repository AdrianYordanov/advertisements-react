import Field from "./Field";

export default class FileField extends Field {
  public value: File;

  constructor(message: string) {
    super(message);
  }

  public validateField = () => {
    return typeof this.value !== "undefined";
  };
}
