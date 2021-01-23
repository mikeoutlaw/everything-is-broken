import { Company } from "./company";
import { Employee } from "./employee";

export class HiringManager extends Employee{
    private intervalId: any;
    private readonly delayMs: number = 1500;
    private isMovedToHrTeam: boolean = false;

    constructor(company: Company) {
        super(company);
        this.intervalId = setInterval(() => {
            if (company.canHireNewDeveloper()) company.hireNewDeveloper();
        }, this.delayMs);
    }

    moveToTeam(): void {
        clearInterval(this.intervalId);
        this.isMovedToHrTeam = true;
    }

    isPartOfHrTeam() {
        return this.isMovedToHrTeam;
    }
}
