import InvalidUuidError from "../../errors/invalidUuidError";
import UniqueEntityId from "./uniqueEntityId-vo";
import { v4 as uuidV4, validate as uuidValidade } from "uuid";

describe("Unique Entity Id Unit test", () => {
  const spyValidateMethod = () =>
    jest.spyOn(UniqueEntityId.prototype as any, "validate");

  it("should throw error when uuid is invalid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("test id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should not throw error when uuid is valid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId(uuidV4())).not.toThrow();
    expect(validateSpy).toHaveBeenCalled();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should accept uuid as constructor argument", () => {
    const uuid = uuidV4();
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
  });

  it("should create uuid when no argument is passed", () => {
    const validateSpy = spyValidateMethod();
    const vo = new UniqueEntityId();
    expect(vo.value).toBeDefined();
    expect(uuidValidade(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
