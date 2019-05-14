export class Ranking {
    id: string;
    name: string;
    ranking: {email: string, value: number}[];
    constructor(name: string, ranking: any, id: string) {
        this.id = id;
        this.name = name;
        this.ranking = ranking;
    }
}
