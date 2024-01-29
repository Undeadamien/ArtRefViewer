export type Card = {
    name: string;
    image_uris: { art_crop: string }; // may be undefined for two sided cards
    uri: string[]; // need to check
};

export class CardList {
    private cards: Card[] = [];
    private current: number = 0;

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
    }
    setToNext() {
        if (this.current + 1 < this.cards.length) {
            this.current += 1;
        }
    }
    getCurrent() {
        return this.cards[this.current];
    }
    setCurrent(x: number) {
        this.current = x;
    }
    isCurrentLast() {
        return this.current === this.cards.length - 1;
    }
}
