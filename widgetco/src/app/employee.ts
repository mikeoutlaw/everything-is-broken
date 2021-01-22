import { CompanyService } from "./company.service";

export class Employee {
    private intervalId: any;
    private readonly delayMs: number = 1000;
    private readonly ticketCloseRate: number = 1;
    private individualContributor: Boolean = true;

    constructor(private companyService: CompanyService) {
        this.intervalId = setInterval(() => {
            this.companyService.closeTickets(this.ticketCloseRate);
        }, this.delayMs);
    }

    isIndividualContributor(): Boolean {
        return this.individualContributor;
    }

    moveToTeam(): void {
        clearInterval(this.intervalId);
        this.individualContributor = false;
    }
}
