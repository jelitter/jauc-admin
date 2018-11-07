export class User {
    uid: string;
    email: string | null;
    family_name: string | null;
    given_name: string | null;
    picture: string | null;
    locale?:  string;
    isAdmin?: boolean;

    constructor(params: Object) {
        Object.assign(this, params);
    }
}
