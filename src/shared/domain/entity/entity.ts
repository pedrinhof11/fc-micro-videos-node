import UniqueEntityId from "../valueObject/uniqueEntityId-vo";

type entityToJSON<Props> = Required<{ id: string } & Props>;

export default abstract class Entity<Props> {
  readonly uniqueId: UniqueEntityId;

  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.uniqueId = id || new UniqueEntityId();
  }

  get id(): string {
    return this.uniqueId.value;
  }

  toJSON(): entityToJSON<Props> {
    return {
      id: this.id,
      ...this.props,
    } as entityToJSON<Props>;
  }
}
