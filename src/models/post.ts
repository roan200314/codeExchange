export class Post {
    private _id: number;
    private _titel: string;
    private _vraag: string;
    private _tijd: Date;
    private _tags: string;
    private _code_snippet: string;

    public constructor(id: number, titel: string, vraag: string, tijd: Date, tags: string, code_snippet: string) {
        this._id = id;
        this._titel = titel;
        this._vraag = vraag;
        this._tijd = tijd;
        this._tags = tags;
        this._code_snippet = code_snippet;
    }

        // Getters en setters
        public get id(): number {
            return this._id;
        }

        public get titel(): string {
            return this._titel;
        }

        public get vraag(): string {
            return this._vraag;
        }

        public get tijd(): Date {
            return this._tijd;
        }
        public get tags(): string {
            return this._tags;
        }
        public get code_snippet(): string {
            return this._code_snippet;
        }

        public toString(): string {
            return `post: ${this._id} ${this._titel} ${this._vraag} ${this._tijd} ${this._code_snippet}`;
        }
}
