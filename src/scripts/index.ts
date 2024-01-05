import { Card, CardList } from "./card";

const apiUrl: string = "https://api.scryfall.com/cards/random";
const prevBut = document.getElementById("previousButton") as HTMLButtonElement;
const nextBut = document.getElementById("nextButton") as HTMLButtonElement;
const imageDis = document.getElementById("refDisplay") as HTMLImageElement;
const nameDis = document.getElementById("nameDisplay") as HTMLParagraphElement;
const startBut = document.getElementById("switchButton") as HTMLButtonElement;
const overlayDis = document.getElementById("overlayDisplay") as HTMLDivElement;
const stopBut = document.getElementById("stopButton") as HTMLButtonElement;
const imageList = new CardList();

async function requestApi(url: string): Promise<Card> {
    return await fetch(url).then((response) => response.json());
}

async function getRequestUrl(): Promise<string> {
    const args: string = ""; // placeholder for future implementation
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
        imageDis.src = card.image_uris.art_crop;
        nameDis.innerText = card.name;
    }
}

function startSession() {
    overlayDis.style.animation = "fadeInOut 0.5s ease-in-out";
    overlayDis.style.visibility = "visible";
}

function stopSession() {
    overlayDis.style.animation = "fadeOutIn 0.5s ease-in-out";
    setTimeout(() => (overlayDis.style.visibility = "hidden"), 450);
}

prevBut.onclick = () => getPreviousImage();
nextBut.onclick = () => getNextImage();
stopBut.onclick = () => stopSession();
startBut.addEventListener("click", (event) => {
    event.preventDefault();
    startSession();
});
