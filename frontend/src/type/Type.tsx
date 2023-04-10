export interface Track {
    id: number;
    name: string;
    price: number;
    duration: number;
    genre: string;
}

export interface GetTracksData {
    getTracks: Track[];
}

export interface GetTracksVariables {
    page: number;
    pageSize: number;
    artistName: string;
    genreName: string;
    minPrice: number;
    maxPrice: number;
}