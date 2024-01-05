export class Timer {
    private startingTime: number = 300;
    private remainingTime: number = this.startingTime;
    private tickCall: NodeJS.Timeout | null = null;

    constructor() {
        this.tick = this.tick.bind(this); // set "this" context for setInterval
    }

    private tick() {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
            this.stop();
        }
    }

    public start() {
        this.tickCall = setInterval(this.tick, 1) as NodeJS.Timeout;
    }

    public stop() {
        if (this.tickCall !== null) {
            clearInterval(this.tickCall);
        }
    }
}
