import { Employee } from "./employee";
import { Team } from "./team";

export class Company {
    employeeCount: number = 0;
    developers: Employee[] = [];
    smallTeams: Team[] = [];
    mediumTeams: Team[] = [];
    largeTeams: Team[] = [];
    hiringMgrs: Employee[] = [];
    hrTeams: Team[] = [];

    private readonly developerDelayMs = 1000;
    private readonly developerTicketCloseRate: number = 1;
    newDeveloperCost: number = 5;
    readonly maxNewHireCost: number = 10;
    readonly minNewHireCost: number = 3;

    private readonly hiringManagerDelayMs = 1500;
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

        this.developers.push(new Employee(
            () => this.closeTickets(this.developerTicketCloseRate),
            this.developerDelayMs));
        this.processNewHireAccounting(this.newDeveloperCost);
        this.newDeveloperCost = this.getNewHireCost();
    }

    hireNewHiringManager(): void {
        if (this.newHiringManagerCost > this.capital) return;

        this.hiringMgrs.push(new Employee(() => {
            if (this.canHireNewDeveloper()) this.hireNewDeveloper();
        }, this.hiringManagerDelayMs));
        this.processNewHireAccounting(this.newHiringManagerCost);
        this.newHiringManagerCost = this.getNewHiringManagerCost();
    }

    /**
     * Returns a cost between the min and max new host cost, exclusively.
     */
    getNewHireCost(): number {
        return Math.random() * (this.maxNewHireCost - this.minNewHireCost) + this.minNewHireCost;
    }

    private processNewHireAccounting(cost: number): void {
        this.capital -= cost;
        this.personnelCost += cost;
        this.employeeCount++;
    }

    private getNewHiringManagerCost(): number {
        return this.getNewHireCost() * this.hiringManagerCostOverhead;
    }

    formSmallTeam(): void {
        if (!this.canFormSmallTeam()) return;
        this.developers
            .slice(0, this.smallTeamSize)
            .forEach(dev => dev.moveToTeam());
        this.developers.splice(0, this.smallTeamSize);
        this.smallTeams.push(new Team(() => this.closeTickets(this.smallTeamTicketCloseRate), this.smallTeamDelayMs));
    }

    canFormSmallTeam(): boolean {
        return this.developers.length >= this.smallTeamSize;
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

        let requirement =
            this.necessaryLargeTeamsForNewHiringManager *
            (this.getHiringManagerCount() + 1) *
            ((this.hrTeams.length * this.necessaryLargeTeamsForNewHiringManager) || 1);
        if (this.largeTeams.length >= requirement) {
            return true;
        }

        return false;
    }

    getIndividualContributorCount(): number {
        return this.developers.length;
    }

    getHiringManagerCount(): number {
        return this.hiringMgrs.length;
    }

    canFormHRTeam(): boolean {
        return this.hiringMgrs.length >= this.necessaryHiringManagersForHRTeam;
    }

    formHrTeam(): void {
        if (!this.canFormHRTeam()) return;
        this.hiringMgrs
            .slice(0, this.necessaryHiringManagersForHRTeam)
            .forEach(employee => employee.moveToTeam());
        this.hiringMgrs.splice(0, this.necessaryHiringManagersForHRTeam);
        this.hrTeams.push(new Team(() => {
            if (this.canFormLargeTeam()) this.formLargeTeam();
            else if (this.canFormMediumTeam()) this.formMediumTeam();
            else if (this.canFormSmallTeam()) this.formSmallTeam();
        }, this.hrTeamDelayMs));
    }

    getEmployeeCount(): number {
        return this.employeeCount;
    }
}