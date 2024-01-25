import { Card } from "./card";

export class CardList {
    private cards: Card[] = [];
    private current: number = 0;

    constructor() {}

    setCards(cards: Card[]) {
        this.cards = cards;
    }
    getCards() {
        return this.cards;
    }

    setToPrevious() {
        if (this.current - 1 >= 0) {
            this.current -= 1;
        }
        return this.current;
    }
    setToNext() {
        if (this.current + 1 < this.cards.length) {
            this.current += 1;
        }
        return this.current;
    }
    getCurrent() {
        return this.current;
    }
}
