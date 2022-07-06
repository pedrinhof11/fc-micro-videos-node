import { omit } from "lodash";
import { Category } from "./category";
import UniqueEntityId from "../../../shared/domain/valueObject/unique-entity-id.vo";

describe("Category Unit Tests", () => {
  beforeEach(() => {
    Category.validate = jest.fn();
  });
  it("should create category with only name", () => {
    const category = new Category({
      name: "movie",
    });
    const props = omit(category.props, "createdAt");
    expect(Category.validate).toBeCalledTimes(1);
    expect(props).toStrictEqual({
      name: "movie",
      description: "",
      isActive: true,
    });
  });

  it("should create category with only name and description", () => {
    const category = new Category({
      name: "movie",
      description: "description movie",
    });
    const props = omit(category.props, "createdAt");
    expect(Category.validate).toBeCalledTimes(1);
    expect(props).toStrictEqual({
      name: "movie",
      description: "description movie",
      isActive: true,
    });
    expect(category.createdAt).toBeInstanceOf(Date);
  });

  it("should create category with isActive equal false", () => {
    const category = new Category({
      name: "movie",
      isActive: false,
    });
    const props = omit(category.props, "createdAt");
    expect(Category.validate).toBeCalledTimes(1);
    expect(props).toStrictEqual({
      name: "movie",
      description: "",
      isActive: false,
    });
    expect(category.createdAt).toBeInstanceOf(Date);
  });

  it("should create category with createdAt date", () => {
    const createdAt = new Date();
    const category = new Category({
      name: "movie",
      createdAt,
    });
    expect(Category.validate).toBeCalledTimes(1);
    expect(category.props).toStrictEqual({
      name: "movie",
      description: "",
      isActive: true,
      createdAt,
    });
  });

  it("should check getters", () => {
    const createdAt = new Date();
    const category = new Category({
      name: "movie",
      description: "some description",
      isActive: false,
      createdAt,
    });
    expect(category.name).toBe("movie");
    expect(category.description).toBe("some description");
    expect(category.isActive).toBeFalsy();
    expect(category.createdAt).toBe(createdAt);
    expect(category.createdAt).toBeInstanceOf(Date);
  });

  it("should check getter and setter of description field", () => {
    let category = new Category({
      name: "movie",
      description: "some description",
    });
    expect(category.name).toBe("movie");
    expect(category.description).toBe("some description");

    category = new Category({
      name: "movie",
    });
    expect(category.name).toBe("movie");
    expect(category.description).toBe("");
  });

  it("should check getter and setter of description props", () => {
    let category = new Category({
      name: "movie",
      description: "some description",
    });
    expect(category.name).toBe("movie");
    expect(category.description).toBe("some description");

    category = new Category({
      name: "movie",
    });
    expect(category.name).toBe("movie");
    expect(category.description).toBe("");
  });

  it("should check getter and setter of isActive props", () => {
    let category = new Category({
      name: "movie",
      isActive: false,
    });
    expect(category.name).toBe("movie");
    expect(category.isActive).toBe(false);

    category = new Category({
      name: "movie",
    });
    expect(category.name).toBe("movie");
    expect(category.isActive).toBe(true);
  });

  it("should check getter and setter of createdAt props", () => {
    const createdAt = new Date();
    let category = new Category({
      name: "movie",
      createdAt: createdAt,
    });
    expect(category.createdAt).toBe(createdAt);
    expect(category.createdAt).toBeInstanceOf(Date);

    category = new Category({
      name: "movie",
    });
    expect(category.createdAt).toBeDefined();
    expect(category.createdAt).toBeInstanceOf(Date);
  });

  it("should create uuid after created", () => {
    const data = [
      { props: { name: "movie" } },
      { props: { name: "movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((item) => {
      const category = new Category(item.props, item.id);
      expect(category.uniqueId).not.toBeNull();
      expect(category.uniqueId).toBeInstanceOf(UniqueEntityId);
      expect(category.id).not.toBeNull();
      expect(typeof category.id).toBe("string");
    });
  });

  it("should update a category", () => {
    const category = new Category({ name: "Movie" });
    category.update("Documentary", "some description");
    expect(Category.validate).toBeCalledTimes(2);
    expect(category.name).toBe("Documentary");
    expect(category.description).toBe("some description");
  });

  it("should activate a category", () => {
    const category = new Category({ name: "Movie", isActive: false });
    expect(category.isActive).toBe(false);
    category.activate();
    expect(category.isActive).toBe(true);
  });

  it("should deactivate a category", () => {
    const category = new Category({ name: "Movie" });
    expect(category.isActive).toBe(true);
    category.deactivate();
    expect(category.isActive).toBe(false);
  });
});
