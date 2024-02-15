import { Card, CardList } from "./card";
import { Form } from "./form";
import { Timer } from "./timer";
import { Api } from "./api";

const prevBut = document.getElementById("previousButton") as HTMLButtonElement;
const nextBut = document.getElementById("nextButton") as HTMLButtonElement;
const stopBut = document.getElementById("stopButton") as HTMLButtonElement;

const formDis = document.getElementById("form") as HTMLFormElement;
const overlayDis = document.getElementById("overlayDisplay") as HTMLDivElement;
const nameDis = document.getElementById("nameDisplay") as HTMLParagraphElement;
const imageDis = document.getElementById("refDisplay") as HTMLImageElement;
const timerDis = document.getElementById("timerDisplay") as HTMLImageElement;

const timer = new Timer();
const cardList: CardList = new CardList();

function unfocusActiveElement() {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
        activeElement.blur();
    }
}

async function getCardList(amount: number, query: string): Promise<Card[]> {
    let promises = Array.from({ length: amount }, () => Api.request(query));
    return Promise.all(promises);
}

function getFormValues(): Form {
    const formData = new FormData(formDis);
    return {
        query: formData.get("query") as string,
        number: parseInt(formData.get("number") as string),
        duration: parseInt(formData.get("duration") as string),
    };
}
function handleFormSubmit(event: Event) {
    // should replace alerts with some pop up
    event.preventDefault();
    let formValues = getFormValues();
    if (isNaN(formValues.number)) {
        alert("The number of image is invalid");
        return;
    }
    if (isNaN(formValues.duration)) {
        alert("The duration is invalid");
        return;
    }
    startSession();
}
function updateTimerDisplay(time: number) {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(Math.floor(time % 60)).padStart(2, "0");
    timerDis.innerHTML = `${hours}:${minutes}:${seconds}`;
}
function updateImage() {
    const card: Card = cardList.getCurrent();
    nameDis.innerHTML = card.name;
    imageDis.src = card.image_uris.art_crop;
}

async function handleTimerEnd() {
    console.log("handleEnd");
    if (cardList.isCurrentLast()) {
        stopSession();
        return;
    }
    cardList.setToNext();
    updateImage();
    timer.reset();
    timer.start();
}

function previousImage() {
    cardList.setToPrevious();
    timer.reset();
    updateImage();
}

function nextImage() {
    cardList.setToNext();
    timer.reset();
    updateImage();
}

async function startSession() {
    const formValues = getFormValues();
    cardList.setCards(await getCardList(formValues.number, formValues.query));
    cardList.setCurrent(0);
    timer.setStartTime(formValues.duration);

    updateImage();
    timer.reset();
    timer.start();

    // fadeIn overlay
    overlayDis.style.animation = "fadeInOut 0.5s ease-in-out";
    overlayDis.style.visibility = "visible";
    unfocusActiveElement();
}

function stopSession() {
    imageDis.src = "";
    timer.stop();

    // fadeOut overlay
    overlayDis.style.animation = "fadeOutIn 0.5s ease-in-out";
    setTimeout(() => (overlayDis.style.visibility = "hidden"), 450);
    unfocusActiveElement();
}

formDis.addEventListener("submit", handleFormSubmit);
stopBut.addEventListener("click", stopSession);
prevBut.addEventListener("click", previousImage);
nextBut.addEventListener("click", nextImage);
document.addEventListener("tick", () => updateTimerDisplay(timer.getTime()));
document.addEventListener("end", () => handleTimerEnd());
