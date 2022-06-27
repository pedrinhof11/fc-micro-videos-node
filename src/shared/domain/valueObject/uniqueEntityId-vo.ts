import InvalidUuidError from "../../errors/invalidUuidError";
import { v4 as uuidV4, validate as uuidValidate } from "uuid";
import ValueObject from "./valueObject";

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
