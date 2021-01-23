import { Developer } from "./developer";
import { Employee } from "./employee";
import { HiringManager } from "./hiring-manager";
import { Team } from "./team";

export class Company {
    employees: Employee[] = [];
    smallTeams: Team[] = [];
    mediumTeams: Team[] = [];
    largeTeams: Team[] = [];
    hrTeams: Team[] = [];

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
    readonly necessaryHiringManagersForHRTeam: number = 3;
    readonly hrTeamDelayMs: number = 2000;

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

    hireNewDeveloper(): void {
        if (this.newDeveloperCost > this.capital) return;

        this.employees.push(new Developer(this));
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

        this.employees.push(new HiringManager(this));
        this.capital -= this.newHiringManagerCost;
        this.personnelCost += this.newHiringManagerCost;
        this.newHiringManagerCost = this.getNewHiringManagerCost();
    }

    private getNewHiringManagerCost(): number {
        return this.getNewHireCost() * this.hiringManagerCostOverhead;
    }

    formSmallTeam(): void {
        let individualContributors = this.employees.filter(employee => employee instanceof Developer && employee.isIndividualContributor());
        if (!this.canFormSmallTeam()) return;
        individualContributors
            .slice(0, this.smallTeamSize)
            .forEach(employee => employee instanceof Developer && employee.moveToTeam());
        this.smallTeams.push(new Team(() => this.closeTickets(this.smallTeamTicketCloseRate), this.smallTeamDelayMs));
    }

    canFormSmallTeam(): boolean {
        return this.employees
            .filter(employee => employee instanceof Developer && employee.isIndividualContributor())
            .length >= this.smallTeamSize;
    }

    canFormMediumTeam(): boolean {
        return this.smallTeams.length >= this.necessarySmallTeamsToFormMediumTeam;
    }

    formMediumTeam(): void {
        if (!this.canFormMediumTeam()) return;
        this.smallTeams
            .slice(0, this.necessarySmallTeamsToFormMediumTeam)
            .forEach(team => team.disbandTeam());
        this.smallTeams.splice(0, this.necessarySmallTeamsToFormMediumTeam);
        this.mediumTeams.push(new Team(() => this.closeTickets(this.mediumTeamTicketCloseRate), this.mediumTeamDelayMs));
    }

    canFormLargeTeam(): boolean {
        return this.mediumTeams.length >= this.necessaryMediumTeamsToFormLargeTeam;
    }

    formLargeTeam(): void {
        if (!this.canFormLargeTeam()) return;
        this.mediumTeams
            .slice(0, this.necessaryMediumTeamsToFormLargeTeam)
            .forEach(team => team.disbandTeam());
        this.mediumTeams.splice(0, this.necessaryMediumTeamsToFormLargeTeam);
        this.largeTeams.push(new Team(() => this.closeTickets(this.largeTeamTicketCloseRate), this.largeTeamDelayMs));
    }

    canHireNewDeveloper(): boolean {
        return this.capital >= this.newDeveloperCost;
    }

    canHireNewHiringManager(): boolean {
        if (this.capital < this.newHiringManagerCost) return false;

        let currentHiringMgrs = this.employees.filter(employee => employee instanceof HiringManager && !(employee as HiringManager).isPartOfHrTeam()).length;
        let excessLargeTeams = this.largeTeams.length - (this.necessaryLargeTeamsForNewHiringManager * currentHiringMgrs);
        if (excessLargeTeams >= this.necessaryLargeTeamsForNewHiringManager) {
            return true;
        }

        return false;
    }

    getIndividualContributorCount(): number {
        return this.employees
            .filter(employee => employee instanceof Developer && (employee as Developer).isIndividualContributor())
            .length;
    }

    getHiringManagerCount(): number {
        return this.employees
            .filter(employee => employee instanceof HiringManager && !(employee as HiringManager).isPartOfHrTeam())
            .length;
    }

    canFormHRTeam(): boolean {
        return this.employees
            .filter(employee => employee instanceof HiringManager && !(employee as HiringManager).isPartOfHrTeam())
            .length >= this.necessaryHiringManagersForHRTeam;
    }

    formHrTeam(): void {
        if (!this.canFormHRTeam()) return;
        this.employees
            .filter(employee => employee instanceof HiringManager && !(employee as HiringManager).isPartOfHrTeam())
            .slice(0, this.necessaryHiringManagersForHRTeam)
            .forEach(employee => (employee as HiringManager).moveToTeam());
        this.hrTeams.push(new Team(() => {
            if (this.canFormSmallTeam()) this.formSmallTeam();
            if (this.canFormMediumTeam()) this.formMediumTeam();
            if (this.canFormLargeTeam()) this.formLargeTeam();
        }, this.hrTeamDelayMs));
    }
}