import { CompanyService } from "./company.service";
import { Employee } from "./employee";

export class SmallTeam {
    private intervalId: any;
    private readonly delayMs: number = 800;
    private readonly ticketCloseRate: number = 5;

    constructor(private companyService: CompanyService) {
        this.intervalId = setInterval(() => {
            this.companyService.closeTickets(this.ticketCloseRate);
        }, this.delayMs);
    }
}
