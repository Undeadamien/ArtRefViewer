import { Card, CardList } from "./card";

const apiUrl: string = "https://api.scryfall.com/cards/random";
const previousButton = document.getElementById(
    "previousButton",
) as HTMLButtonElement;
const nextButton = document.getElementById("nextButton") as HTMLButtonElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const imageDisplay = document.getElementById("refDisplay") as HTMLImageElement;
const nameDisplay = document.getElementById(
    "nameDisplay",
) as HTMLParagraphElement;

const imageList = new CardList();

async function requestApi(url: string): Promise<Card> {
    return await fetch(url).then((response) => response.json());
}

async function getRequestUrl(): Promise<string> {
    const args: string = searchInput.value;
    return args ? `${apiUrl}/?q=${args}` : apiUrl;
}

async function getPreviousImage(): Promise<void> {
    let card = imageList.previous();
    if (card) {
        await updateImage(card);
    }
}

async function getNextImage(): Promise<void> {
    let card = imageList.next();
    if (card) {
        await updateImage(card);
    } else {
        let nextImage = await getRequestUrl().then((url) => requestApi(url));
        imageList.add(nextImage);
        await updateImage(imageList.next()!); //probably a bad idea
    }
}

async function updateImage(card: Card): Promise<void> {
    if (card && card.image_uris && card.image_uris.art_crop) {
        imageDisplay.src = card.image_uris.art_crop;
        nameDisplay.innerText = card.name;
    }
}

searchInput.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        getNextImage();
    }
});

previousButton.onclick = () => getPreviousImage();
nextButton.onclick = () => getNextImage();
