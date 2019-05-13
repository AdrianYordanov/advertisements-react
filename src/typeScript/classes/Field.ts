export default abstract class Field {
  public message: string;

  constructor(message: string) {
    this.message = message;
  }

  public abstract validateField(): boolean;
}
