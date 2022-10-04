export interface PlayerI {
    id?: number;
    firstName: string;
    lastName: string;
    image: string;
    attack: number;
    defense: number;
    skills: number;
    idAuthor: number;
    idPosition: number;
}

export interface SearchI {
    search: string;
}