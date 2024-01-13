


export class Answers {

    private _id: number;
    private _vraag_id: number;
    private _user_id: number;
    private _antwoord: string;


    public constructor(

        id: number,
        vraag_id: number,
        user_id: number,
        antwoord: string

    ) {
        this._id = id;
        this._vraag_id = vraag_id;
        this._user_id = user_id;
        this._antwoord = antwoord;
    }

    public get id(): number {
        return this._id;
    }

    public get vraag_id(): number {
        return this._vraag_id;
    }
    public get user_id(): number {
        return this._user_id;
    }
    public get antwoord(): string {
        return this._antwoord;
    }

        //set
        public set id(value: number) {
            this._id = value;
        }
    
        public set vraag_id(value: number) {
            this._vraag_id = value;
        }
    
        public set user_id(value: number) {
            this._user_id = value;
        }
    
        public set antwoord(value: string) {
            this._antwoord = value;
        }
    
        public toString(): string {
            return `answers: ${this._id} ${this._vraag_id} ${this._user_id} ${this._antwoord}` ;
        }
}