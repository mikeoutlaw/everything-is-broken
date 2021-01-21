import { ScoreService } from "./score.service";

export class Employee {
    intervalId: any;
    delayMs: number = 1000;

    constructor(private scoreService: ScoreService) {
        this.intervalId = setInterval(() => {
            this.scoreService.incrementScore();
        }, this.delayMs);
    }
}
