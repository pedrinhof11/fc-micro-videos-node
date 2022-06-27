import { deepFreeze } from "./object-utils";

describe("Object Utils Unit tests", () => {
  it("should be not freeze a scalar value", () => {
    const str = deepFreeze("a");
    expect(str).toBe("a");
    expect(typeof str).toBe("string");

    const num = deepFreeze(1);
    expect(num).toBe(1);
    expect(typeof num).toBe("number");

    let boolean = deepFreeze(false);
    expect(boolean).toBe(false);
    expect(typeof boolean).toBe("boolean");

    boolean = deepFreeze(true);
    expect(boolean).toBe(true);
    expect(typeof boolean).toBe("boolean");
  });

  it("should be a immutable object", () => {
    const obj = deepFreeze({
      prop1: "a",
      nestedProps: {
        prop2: "ab",
        prop3: new Date(),
      },
    });
    expect(() => {
      (obj as any).prop1 = "test";
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );

    expect(() => {
      (obj as any).nestedProps.prop2 = "test";
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );

    expect(() => {
      (obj as any).nestedProps.prop3 = "test";
    }).toThrow(
      "Cannot assign to read only property 'prop3' of object '#<Object>'"
    );
  });
});
