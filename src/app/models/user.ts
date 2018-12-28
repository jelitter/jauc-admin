export class User {
    public phoneNumber: string = null;

    constructor(public key: string, public displayName: string, public email: string, public photoUrl: string) {}
}
