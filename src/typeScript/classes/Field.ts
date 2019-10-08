export default abstract class Field {
  constructor(public message: string) {}

  public abstract validateField(): boolean;
}
