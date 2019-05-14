export class Comments {
    id: string;
    name: string;
    image: string;
    likes: number;
    feedbacks: {name: string, text: string, date: string, image: string, email: string}[];
    constructor(name: string, image: string, likes: number, feedbacks: any, id: string) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.likes = likes;
        this.feedbacks = feedbacks;
    }
}
