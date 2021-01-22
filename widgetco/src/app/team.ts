import { CompanyService } from "./company.service";

export class Team {
    private intervalId: any;

    constructor(private companyService: CompanyService, delayMs: number, ticketCloseRate: number) {
        this.intervalId = setInterval(() => {
            this.companyService.closeTickets(ticketCloseRate);
        }, delayMs);
    }

    disbandTeam(): void {
        clearInterval(this.intervalId);
    }
}
