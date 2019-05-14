export class Profile {
    email: string;
    travels: { name: string, image: string }[];
    bookmarks: { name: string }[];
    feedbacks: number;
    followers: number;
    todo: { text: string, time: string }[];

    constructor(email: string, travels: any, bookmarks: any, feedbacks: number, followers: number, todo: any) {
        this.email = email;
        this.travels = travels;
        this.bookmarks = bookmarks;
        this.feedbacks = feedbacks;
        this.followers = followers;
        this.todo = todo;
    }

}
