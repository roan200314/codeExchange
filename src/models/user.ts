export class User {
    // private fields
    private _id: number;
    private _username: string;
    private _email: string;
    private _firstname: string;
    private _lastname: string;
    private _birth_year: Date;
    private _expertise: string;
    private _years_experience: string;
    private _profile_picture: string;

    // De constructor wordt eenmalig aangeroepen als de class wordt geïnstantieerd.
    // Deze constructor vult de fields bij het aanmaken van een object.
    public constructor(
        id: number,
        username: string,
        email: string,
        firstname: string,
        lastname: string,
        birth_year: Date,
        expertise: string,
        years_experience: string,
        profile_picture: string
    ) {
        this._id = id;
        this._username = username;
        this._email = email;
        this._firstname = firstname;
        this._lastname = lastname;
        this._birth_year = birth_year;
        this._expertise = expertise;
        this._years_experience = years_experience;
        this._profile_picture = profile_picture;
    }

    // Getters en setter
    public get id(): number {
        return this._id;
    }

    public get username(): string {
        return this._username;
    }

    public get email(): string {
        return this._email;
    }

    public get firstname(): string {
        return this._firstname;
    }

    public get birth_year(): Date {
        return this._birth_year;
    }

    public get expertise(): string {
        return this._expertise;
    }
    public get lastname(): string {
        return this._lastname;
    }
    public get years_experience(): string {
        return this._years_experience;
    }

    public get profile_picture(): string {
        return this._profile_picture;
    }


    //set
    public set id(value: number) {
        this._id = value;
    }

    public set username(value: string) {
        this._username = value;
    }

    public set email(value: string) {
        this._email = value;
    }

    public set firstname(value: string) {
        this._firstname = value;
    }

    public set lastname(value: string) {
        this._lastname = value;
    }
    public set birth_year(value: Date) {
        this._birth_year = value;
    }
    public set expertise(value: string) {
        this._expertise = value;
    }
    public set years_experience(value: string) {
        this._years_experience = value;
    }

    public set profile_picture(value: string) {
        this._profile_picture = value;
    }

    public toString(): string {
        return `User: ${this._id} ${this._username} ${this._email} ${this._firstname} ${this._lastname}, ${this._birth_year}, ${this._expertise}, ${this._years_experience}, ${this._profile_picture}` ;
    }
}
