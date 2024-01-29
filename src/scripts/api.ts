import { Card } from "./card";

export namespace Api {
    export const url: string = "https://api.scryfall.com/cards/random";

    export async function request(args: string | undefined): Promise<Card> {
        // to take into consideration the case where the response is a multi-card
        const requestUrl = args ? `${url}/?q=${args}` : url;
        const response = await fetch(requestUrl);
        const responseJson = await response.json();
        return responseJson;
    }
}
