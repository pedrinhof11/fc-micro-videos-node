import InvalidUuidError from "../../errors/invalid-uuid.error";
import { v4 as uuidV4, validate as uuidValidate } from "uuid";
import ValueObject from "./value-object";

export default class UniqueEntityId extends ValueObject<string> {
  constructor(private readonly id: string = uuidV4()) {
    super(id);
    this.validate();
  }
  private validate() {
    if (!uuidValidate(this.id)) {
      throw new InvalidUuidError();
    }
  }
}
