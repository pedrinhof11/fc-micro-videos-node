import ValidationError from "../errors/validation.error";

export default class ValidatorRules {
  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }

  private constructor(private value: any, private property: string) {}

  required(): this {
    if (this.value === null || this.value === undefined || this.value === "") {
      throw new ValidationError(`the ${this.property} is required`);
    }
    return this;
  }

  string(): this {
    if (!isNullOrUndefined(this.value) && typeof this.value !== "string") {
      throw new ValidationError(`the ${this.property} must be a string`);
    }
    return this;
  }

  maxLength(max: number): this {
    if (!isNullOrUndefined(this.value) && this.value.length > max) {
      throw new ValidationError(
        `the ${this.property} must be less or equal than ${max}`
      );
    }
    return this;
  }

  boolean(): this {
    if (!isNullOrUndefined(this.value) && typeof this.value !== "boolean") {
      throw new ValidationError(`the ${this.property} must be a boolean`);
    }
    return this;
  }
}

const isNullOrUndefined = (value: any) => value === null || value === undefined;
