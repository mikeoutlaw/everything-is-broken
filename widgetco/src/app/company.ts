import { CompanyService } from "./company.service";
import { Employee } from "./employee";
import { Team } from "./team";

export class Company {
    employees: Employee[] = [];
    smallTeams: Team[] = [];

    hiringBudget: number = 5;
    ticketsClosed: number = 0;
    personnelCost: number = 0;

    readonly maxTicketValue: number = .18;
    readonly minTicketValue: number = .07;

    private readonly smallTeamSize: number = 5;
    private readonly smallTeamDelayMs: number = 800;
    private readonly smallTeamTicketCloseRate: number = 5;

    constructor() {}

    /**
     * Increments the closed tickets as well as increments the hiring budget based on the number of tickets closed
     * to be a multiple of a random number between min and max ticket value.
     *
     * @param numTickets
     */
    closeTickets(numTickets: number): void {
        this.ticketsClosed += numTickets;
        this.hiringBudget += numTickets * (Math.random() * (((this.maxTicketValue - this.minTicketValue) + this.minTicketValue)));
    }

    hireNewEmployee(companyService: CompanyService, cost: number): Boolean {
        if (cost > this.hiringBudget) return false;

        this.employees.push(new Employee(companyService));
        this.hiringBudget -= cost;
        this.personnelCost += cost;
        return true;
    }

    formSmallTeam(companyService: CompanyService): void {
        let individualContributors = this.employees.filter(employee => employee.isIndividualContributor());
        if (individualContributors.length < this.smallTeamSize) return;
        individualContributors.slice(0, this.smallTeamSize).forEach(employee => employee.moveToTeam());
        this.smallTeams.push(new Team(companyService, this.smallTeamDelayMs, this.smallTeamTicketCloseRate));
    }

    canFormSmallTeam(): Boolean {
        return this.employees.filter(employee => employee.isIndividualContributor()).length >= this.smallTeamSize;
    }
}
