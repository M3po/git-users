export class Deserialize {
    protected _deserialize(input: unknown): unknown {
        Object.assign(this, input);
        return this;
    }
}