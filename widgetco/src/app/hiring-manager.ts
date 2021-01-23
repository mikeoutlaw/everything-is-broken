import { Company } from "./company";
import { Employee } from "./employee";

export class HiringManager extends Employee{
    private intervalId: any;
    private readonly delayMs: number = 1500;

    constructor(company: Company) {
        super(company);
        this.intervalId = setInterval(() => {
            if (company.canHireNewDeveloper()) company.hireNewDeveloper();
        }, this.delayMs);
    }
}
