import Field from "./Field";

export default class FileField extends Field {
  constructor(message: string, public value?: File) {
    super(message);
  }

  public validateField = () => {
    return this.value === undefined;
  };
}
