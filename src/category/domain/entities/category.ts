import ValidatorRules from "../../../shared/validators/validator-rules";
import Entity from "../../../shared/domain/entity/entity";
import UniqueEntityId from "../../../shared/domain/valueObject/unique-entity-id.vo";
import { validate } from "uuid";
export type CategoryProps = {
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export class Category extends Entity<CategoryProps> {
  constructor(public readonly props: CategoryProps, id?: UniqueEntityId) {
    Category.validate(props);
    super(props, id);
    this.description = this.props.description;
    this.isActive = this.props.isActive;
    this.createdAt = this.props.createdAt;
  }

  update(name: string, description: string) {
    Category.validate({ name, description });
    this.name = name;
    this.description = description;
  }

  static validate(props: Omit<CategoryProps, "createdAt">) {
    ValidatorRules.values(props.name, "name").required().string();
    ValidatorRules.values(props.description, "description").string();
    ValidatorRules.values(props.isActive, "isActive").boolean();
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  get name(): string {
    return this.props.name;
  }
  private set name(value: string) {
    this.props.name = value;
  }
  get description(): string | undefined {
    return this.props.description;
  }
  private set description(value) {
    this.props.description = value ?? "";
  }
  get isActive(): boolean | undefined {
    return this.props.isActive;
  }
  private set isActive(value) {
    this.props.isActive = value ?? true;
  }
  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }
  private set createdAt(value) {
    this.props.createdAt = value ?? new Date();
  }
}
