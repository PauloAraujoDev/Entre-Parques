export class UnidadesConservacao {
    id: string;
    name: string;
    description: string;
    state: string;
    pathImage: string[];
    position: {
        latitude: number,
        longitude: number,
    };
    warnings: { label: string, image: string, description: string }[];
    attractive: { label: string, image: string, description: string }[];


    constructor(id: string, name?: string, description?: string, state?: string, pathImage?: string[], position?: any,
        warnings?: any, attractive?: any ) {
        this.name = name;
        this.description = description;
        this.pathImage = pathImage;
        this.position = position;
        this.warnings = warnings;
        this.attractive = attractive;
        this.state = state;
        this.id = id;
    }
}
