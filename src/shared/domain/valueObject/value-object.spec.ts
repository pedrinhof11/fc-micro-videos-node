import ValueObject from "./value-object";

class StubVulueObject extends ValueObject {}

describe("Value Object Unit Tests", () => {
  it("should create stub value object with a value", () => {
    const valueObject = new StubVulueObject("some value");
    expect(valueObject.value).toBe("some value");
  });

  it("should create stub value object with an object as value", () => {
    const valueObject = new StubVulueObject({ props1: "test" });
    expect(valueObject.value).toStrictEqual({ props1: "test" });
  });

  it("should convert value to string", () => {
    const valueObject = new StubVulueObject("some value");
    expect(`${valueObject}`).toBe("some value");
  });

  it("should convert value object number to string", () => {
    expect(`${new StubVulueObject(1000)}`).toBe("1000");
    expect(`${new StubVulueObject(1)}`).toBe("1");
    expect(`${new StubVulueObject(0)}`).toBe("0");
    expect(`${new StubVulueObject(5)}`).toBe("5");
  });

  it("should convert value object to string", () => {
    const object = { props1: "asdf" };
    expect(`${new StubVulueObject(object)}`).toStrictEqual(
      JSON.stringify(object)
    );
  });

  it("should convert value object string empty to string", () => {
    expect(`${new StubVulueObject("")}`).toBe("");
  });

  it("should be value object immutable", () => {
    const valueObject = new StubVulueObject({
      prop1: "a",
      nestedProps: {
        prop2: "ab",
        prop3: new Date(),
      },
    });
    const value = (valueObject as any).value;
    expect(() => {
      value.prop1 = "b";
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );

    expect(() => {
      value.nestedProps.prop2 = "bc";
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );

    expect(() => {
      value.newProp = "new";
    }).toThrow("Cannot add property newProp, object is not extensible");
  });
});
