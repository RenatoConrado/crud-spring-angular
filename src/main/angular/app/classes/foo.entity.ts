export class Foo {
    constructor(
        private _name: string,
        private readonly _id?: number
    ) {}

    get id(): number | undefined {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}
