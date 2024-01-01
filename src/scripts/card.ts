export interface Card {
    name: string;
    image_uris?: { art_crop?: string }; // may be undefined for two sided cards
    uri?: string[]; // need to check
}

export class CardList {
    private cards: Card[];
    private index: number;
    constructor() {
        this.index = -1;
        this.cards = [];
    }
    current(): Card {
        return this.cards[this.index];
    }
    previous(): Card | undefined {
        if (this.index > 0) {
            this.index--;
            return this.cards[this.index];
        }
    }
    next(): Card | undefined {
        if (this.index < this.cards.length - 1) {
            this.index++;
            return this.cards[this.index];
        }
    }
    add(card: Card) {
        this.cards.push(card);
    }
}
