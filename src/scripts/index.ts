import { Card } from "./card";
import { CardList } from "./cardList";
import { Form } from "./form";
import { Timer } from "./timer";
import { Api } from "./api";

const prevBut = document.getElementById("previousButton") as HTMLButtonElement;
const nextBut = document.getElementById("nextButton") as HTMLButtonElement;
const imageDis = document.getElementById("refDisplay") as HTMLImageElement;
const nameDis = document.getElementById("nameDisplay") as HTMLParagraphElement;
const formDis = document.getElementById("form") as HTMLFormElement;
const overlayDis = document.getElementById("overlayDisplay") as HTMLDivElement;
const stopBut = document.getElementById("stopButton") as HTMLButtonElement;

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

async function startSession() {
    let formValues = getFormValues();
    let cardList: CardList = new CardList();
    cardList.setCards(await getCardList(formValues.number, formValues.query));

    // fadeIn overlay
    overlayDis.style.animation = "fadeInOut 0.5s ease-in-out";
    overlayDis.style.visibility = "visible";
}

function stopSession() {
    // fadeOut overlay
    overlayDis.style.animation = "fadeOutIn 0.5s ease-in-out";
    setTimeout(() => (overlayDis.style.visibility = "hidden"), 450);
}

formDis.addEventListener("submit", handleFormSubmit);
stopBut.addEventListener("click", stopSession);
