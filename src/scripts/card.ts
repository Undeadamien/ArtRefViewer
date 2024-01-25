export interface Card {
    name: string;
    image_uris?: { art_crop?: string }; // may be undefined for two sided cards
    uri?: string[]; // need to check
}
