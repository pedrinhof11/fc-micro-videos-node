import { deepFreeze } from "../utils/object.utils";

export default abstract class ValueObject<Value = any> {
  readonly #value: Value;
  constructor(value: Value) {
    this.#value = deepFreeze(value);
  }

  get value(): Value {
    return this.#value;
  }

  toString = (): string => {
    const value = this.value as any;
    if (!value) {
      return value + "";
    }
    const valueStr = value.toString?.() ?? value + "";
    return valueStr === "[object Object]" ? JSON.stringify(value) : valueStr;
  };
}
