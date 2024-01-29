export class Timer {
    private startingTime: number = 0;
    private remainingTime: number = this.startingTime;
    private tickCall: NodeJS.Timeout | null = null;

    private tickEvent = new Event("tick");
    private endEvent = new Event("end");

    constructor() {
        this.tick = this.tick.bind(this); // set "this" context for setInterval
    }

    public getStartTime() {
        return this.startingTime;
    }

    private tick() {
        if (this.remainingTime <= 0) {
            this.stop();
            this.emitEndEvent();
        }
        this.emitTickEvent();
        this.remainingTime--;
    }

    private emitEndEvent() {
        console.log("endEvent");
        document.dispatchEvent(this.endEvent);
    }
    private emitTickEvent() {
        console.log("tickEvent");
        document.dispatchEvent(this.tickEvent);
    }

    public getTime() {
        return this.remainingTime;
    }

    public setStartTime(time: number) {
        this.startingTime = this.remainingTime = time;
    }

    public reset() {
        this.remainingTime = this.startingTime;
    }

    public start(time?: number) {
        if (time) {
            this.setStartTime(time);
        }
        this.emitTickEvent();
        if (this.tickCall === null) {
            this.tickCall = setInterval(this.tick, 1000) as NodeJS.Timeout;
        }
    }

    public stop() {
        if (this.tickCall !== null) {
            clearInterval(this.tickCall);
            this.tickCall = null;
        }
    }
}
