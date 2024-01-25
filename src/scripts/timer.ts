export class Timer {
    private startingTime: number = 300;
    private remainingTime: number = this.startingTime;
    private tickCall: NodeJS.Timeout | null = null;

    constructor() {
        this.tick = this.tick.bind(this); // set "this" context for setInterval
    }

    public getStartTime() {
        return this.startingTime;
    }

    private tick() {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
            this.stop();
        }
    }

    public setStartTime(time: number) {
        this.startingTime = time;
    }

    public reset() {
        this.remainingTime = this.startingTime;
    }

    public start() {
        if (this.tickCall === null) {
            this.tickCall = setInterval(this.tick, 1) as NodeJS.Timeout;
        }
    }

    public stop() {
        if (this.tickCall !== null) {
            clearInterval(this.tickCall);
            this.tickCall = null;
        }
    }
}
