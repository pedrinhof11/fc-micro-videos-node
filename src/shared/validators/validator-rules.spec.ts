import ValidationError from "../errors/validation.error";
import ValidatorRules from "./validator-rules";

describe("Validator Rules Unit Tests", () => {
  test("values method", () => {
    const validator = ValidatorRules.values("some value", "field");
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field");
  });

  test("invalid cases required validation rule", () => {
    const arranges = [{ value: null }, { value: undefined }, { value: "" }];
    arranges.forEach(({ value }) => {
      expect(() =>
        ValidatorRules.values(value, "field").required()
      ).toThrowError(new ValidationError("the field is required"));
    });
  });

  test("valid cases required validation rule", () => {
    const arranges = [
      { value: "some value" },
      { value: false },
      { value: true },
    ];
    arranges.forEach(({ value }) => {
      expect(() =>
        ValidatorRules.values(value, "field").required()
      ).not.toThrow();
    });
  });

  test("invalid cases string validation rule", () => {
    const arranges = [
      { value: 0 },
      { value: 5 },
      { value: false },
      { value: true },
      { value: {} },
    ];
    arranges.forEach(({ value }) => {
      expect(() => ValidatorRules.values(value, "field").string()).toThrowError(
        new ValidationError("the field must be a string")
      );
    });
  });

  test("valid cases string validation rule", () => {
    const arranges = [
      { value: "" },
      { value: "some" },
      { value: "values" },
      { value: null },
      { value: undefined },
    ];
    arranges.forEach(({ value }) => {
      expect(() =>
        ValidatorRules.values(value, "field").string()
      ).not.toThrow();
    });
  });

  test("invalid cases max length validation rule", () => {
    const arranges = [
      { value: "some test", max: 5 },
      { value: "so", max: 1 },
      { value: "so test ".repeat(10), max: 79 },
    ];
    arranges.forEach(({ value, max }) => {
      expect(() =>
        ValidatorRules.values(value, "fieldName").maxLength(max)
      ).toThrowError(
        new ValidationError(`the fieldName must be less or equal than ${max}`)
      );
    });
  });

  test("valid cases max length validation rule", () => {
    const arranges = [
      { value: "some test", max: 255 },
      { value: "s", max: 1 },
      { value: "so test ".repeat(10), max: 80 },
    ];
    arranges.forEach(({ value, max }) => {
      expect(() =>
        ValidatorRules.values(value, "fieldName").maxLength(max)
      ).not.toThrow();
    });
  });

  test("invalid cases boolean validation rule", () => {
    const arranges = [
      { value: "some test" },
      { value: "" },
      { value: {} },
      { value: 0 },
      { value: 1 },
    ];
    arranges.forEach(({ value }) => {
      expect(() =>
        ValidatorRules.values(value, "fieldName").boolean()
      ).toThrowError(new ValidationError("the fieldName must be a boolean"));
    });
  });
});
