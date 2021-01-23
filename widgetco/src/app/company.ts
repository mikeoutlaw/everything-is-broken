import { CompanyService } from "./company.service";
import { Developer } from "./developer";
import { Employee } from "./employee";
import { HiringManager } from "./hiring-manager";
import { Team } from "./team";

export class Company {
    employees: Employee[] = [];
    smallTeams: Team[] = [];
    mediumTeams: Team[] = [];
    largeTeams: Team[] = [];

    newDeveloperCost: number = 5;
    readonly maxNewHireCost: number = 10;
    readonly minNewHireCost: number = 3;

    newHiringManagerCost: number = 0;
    private readonly hiringManagerCostOverhead: number = 1.25;

    capital: number = 5;
    ticketsClosed: number = 0;
    personnelCost: number = 0;

    readonly maxTicketValue: number = .18;
    readonly minTicketValue: number = .07;

    readonly smallTeamSize: number = 5;
    readonly smallTeamDelayMs: number = 800;
    readonly smallTeamTicketCloseRate: number = 5;

    readonly necessarySmallTeamsToFormMediumTeam: number = 2;
    readonly mediumTeamDelayMs: number = 1100;
    readonly mediumTeamTicketCloseRate: number = 13;

    readonly necessaryMediumTeamsToFormLargeTeam: number = 2;
    readonly largeTeamDelayMs: number = 1600;
    readonly largeTeamTicketCloseRate: number = 22;

    readonly necessaryLargeTeamsForNewHiringManager: number = 4;

    constructor() {
        this.newHiringManagerCost = this.getNewHiringManagerCost();
    }

    /**
     * Increments the closed tickets as well as increments the hiring budget based on the number of tickets closed
     * to be a multiple of a random number between min and max ticket value.
     *
     * @param numTickets
     */
    closeTickets(numTickets: number): void {
        this.ticketsClosed += numTickets;
        this.capital += numTickets * (Math.random() * (((this.maxTicketValue - this.minTicketValue) + this.minTicketValue)));
    }

    hireNewDeveloper(companyService: CompanyService): void {
        if (this.newDeveloperCost > this.capital) return;

        this.employees.push(new Developer(companyService));
        this.capital -= this.newDeveloperCost;
        this.personnelCost += this.newDeveloperCost;
        this.newDeveloperCost = this.getNewHireCost();
    }

    /**
     * Returns a cost between the min and max new host cost, exclusively.
     */
    getNewHireCost(): number {
        return Math.random() * (this.maxNewHireCost - this.minNewHireCost) + this.minNewHireCost;
    }

    hireNewHiringManager(): void {
        if (this.newHiringManagerCost > this.capital) return;

        this.employees.push(new HiringManager());
        this.capital -= this.newHiringManagerCost;
        this.personnelCost += this.newHiringManagerCost;
        this.newHiringManagerCost = this.getNewHiringManagerCost();
    }

    private getNewHiringManagerCost(): number {
        return this.getNewHireCost() * this.hiringManagerCostOverhead;
    }

    formSmallTeam(companyService: CompanyService): void {
        let individualContributors = this.employees.filter(employee => employee instanceof Developer && employee.isIndividualContributor());
        if (individualContributors.length < this.smallTeamSize) return;
        individualContributors.slice(0, this.smallTeamSize).forEach(employee => employee instanceof Developer && employee.moveToTeam());
        this.smallTeams.push(new Team(companyService, this.smallTeamDelayMs, this.smallTeamTicketCloseRate));
    }

    canFormSmallTeam(): Boolean {
        return this.employees.filter(employee => employee instanceof Developer && employee.isIndividualContributor()).length >= this.smallTeamSize;
    }

    canFormMediumTeam(): Boolean {
        return this.smallTeams.length >= this.necessarySmallTeamsToFormMediumTeam;
    }

    formMediumTeam(companyService: CompanyService): void {
        if (!this.canFormMediumTeam()) return;
        this.smallTeams.slice(0, this.necessarySmallTeamsToFormMediumTeam).forEach(team => team.disbandTeam());
        this.smallTeams.splice(0, this.necessarySmallTeamsToFormMediumTeam);
        this.mediumTeams.push(new Team(companyService, this.mediumTeamDelayMs, this.mediumTeamTicketCloseRate));
    }

    canFormLargeTeam(): Boolean {
        return this.mediumTeams.length >= this.necessaryMediumTeamsToFormLargeTeam;
    }

    formLargeTeam(companyService: CompanyService): void {
        if (!this.canFormLargeTeam()) return;
        this.mediumTeams.slice(0, this.necessaryMediumTeamsToFormLargeTeam).forEach(team => team.disbandTeam());
        this.mediumTeams.splice(0, this.necessaryMediumTeamsToFormLargeTeam);
        this.largeTeams.push(new Team(companyService, this.largeTeamDelayMs, this.largeTeamTicketCloseRate));
    }

    canHireNewDeveloper(): Boolean {
        return this.capital >= this.newDeveloperCost;
    }

    canHireNewHiringManager(): Boolean {
        if (this.capital < this.newHiringManagerCost) return false;

        let currentHiringMgrs = this.employees.filter(employee => employee instanceof HiringManager).length;
        let excessLargeTeams = this.largeTeams.length - (this.necessaryLargeTeamsForNewHiringManager * currentHiringMgrs);
        if (excessLargeTeams >= this.necessaryLargeTeamsForNewHiringManager) {
            return true;
        }

        return false;
    }
}