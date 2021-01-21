import { CompanyService } from "./company.service";

export class Employee {
    intervalId: any;
    delayMs: number = 1000;

    constructor(private companyService: CompanyService) {
        this.intervalId = setInterval(() => {
            this.companyService.closeTickets(1);
        }, this.delayMs);
    }
}
