import { Card } from "./card";

export namespace Api {
    export const url: string = "https://api.scryfall.com/cards/random";

    export async function request(args: string | undefined): Promise<Card> {
        const requestUrl = args ? `${url}/?q=${args}` : url;
        return await fetch(requestUrl).then((response) => response.json());
    }
}
