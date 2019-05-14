export class User {
    id: string;
    idToken?: string;
    image: string;
    name: string;
    provider: string;
    token?: string;
    email?: string;

    constructor(id?: string, idToken?: string, image?: string, name?: string, provider?: any, token?: string, email?: string ) {
        this.id = id;
        this.idToken = idToken;
        this.image = image;
        this.name = name;
        this.provider = provider;
        this.token = token;
        this.email = email;
    }
}
