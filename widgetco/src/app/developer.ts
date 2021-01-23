import { Company } from "./company";
import { Employee } from "./employee";

export class Developer extends Employee{
    private intervalId: any;
    private readonly delayMs: number = 1000;
    private readonly ticketCloseRate: number = 1;
    private individualContributor: Boolean = true;

    constructor(company: Company) {
        super(company);
        this.intervalId = setInterval(() => {
            this.company.closeTickets(this.ticketCloseRate);
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
