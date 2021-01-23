export class Team {
    private intervalId: any;

    constructor(onTimer: Function, delayMs: number) {
        this.intervalId = setInterval(onTimer, delayMs);
    }

    disbandTeam(): void {
        clearInterval(this.intervalId);
    }
}
