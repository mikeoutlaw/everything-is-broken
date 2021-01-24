export class Employee {
    private intervalId: any;
    protected delayMs: number = 1000;

    constructor(onTimer: Function, delayMs: number) {
        this.intervalId = setInterval(onTimer, delayMs);
    }

    moveToTeam(): void {
        clearInterval(this.intervalId);
    }
}
