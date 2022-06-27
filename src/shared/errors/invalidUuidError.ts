export default class InvalidUuidError extends Error {
  constructor(message: string = "ID must be a valid UUID") {
    super(message);
    this.name = "InvalidUuidError";
  }
}
