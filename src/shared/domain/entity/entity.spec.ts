import UniqueEntityId from "../valueObject/uniqueEntityId-vo";
import Entity from "./entity";

class StubEntity extends Entity<{ name: string; age: number }> {}
describe("Entity unit tests", () => {
  it("should set props and id", () => {
    const props = { name: "entity", age: 2 };
    const entity = new StubEntity(props);
    expect(entity.props).toStrictEqual(props);
    expect(entity.uniqueId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).not.toBeNull();
  });

  it("should accept a valid uuid", () => {
    const props = { name: "entity", age: 2 };
    const uniqueId = new UniqueEntityId();
    const entity = new StubEntity(props, uniqueId);
    expect(entity.props).toStrictEqual(props);
    expect(entity.uniqueId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uniqueId.value);
  });

  it("should convert a entity to a json valid", () => {
    const props = { name: "entity", age: 2 };
    const uniqueId = new UniqueEntityId();
    const entity = new StubEntity(props, uniqueId);
    expect(entity.toJSON()).toStrictEqual({
      ...props,
      id: uniqueId.value,
    });
  });
});
