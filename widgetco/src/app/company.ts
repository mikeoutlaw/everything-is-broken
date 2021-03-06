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

    messages: string[] = [];

    private readonly developerDelayMs = 1000;
    private readonly developerTicketCloseRate: number = 1;
    newDeveloperCost: number = 5;
    readonly maxNewHireCost: number = 10;
    readonly minNewHireCost: number = 3;
    private readonly maxIndividualContributors: number = 30;

    private readonly hiringManagerDelayMs = 1500;
    newHiringManagerCost: number = 0;
    private readonly hiringManagerCostOverhead: number = 1.25;

    capital: number = 5;
    ticketsClosed: number = 0;
    personnelCost: number = 0;
    capitalExpenditues: number = 0;

    readonly maxTicketValue: number = .18;
    readonly minTicketValue: number = .07;

    readonly smallTeamSize: number = 5;
    readonly smallTeamDelayMs: number = 800;
    readonly smallTeamTicketCloseRate: number = 5;
    private readonly maxSmallTeams: number = 8;

    readonly necessarySmallTeamsToFormMediumTeam: number = 2;
    readonly mediumTeamDelayMs: number = 1100;
    readonly mediumTeamTicketCloseRate: number = 13;
    private readonly maxMediumTeams: number = 6;

    readonly necessaryMediumTeamsToFormLargeTeam: number = 2;
    readonly largeTeamDelayMs: number = 1600;
    readonly largeTeamTicketCloseRate: number = 22;

    readonly necessaryLargeTeamsForNewHiringManager: number = 4;
    readonly necessaryHiringManagersForHRTeam: number = 3;
    readonly hrTeamDelayMs: number = 2000;
    private readonly maxHiringManagers: number = 6;

    private buildingCount: number = 0;
    readonly necessaryHrTeamsForNewBuilding: number = 2;
    private newBuildingCost: number = 1000;
    private newBuildingCostFluctuation: number = .2;

    constructor() {
        this.newHiringManagerCost = this.getNewHiringManagerCost();
        this.messages.push('Welcome to WidgetCo!');
    }

    reset() {
        this.developers.forEach((d) => clearInterval(d['intervalId']));
        this.smallTeams.forEach((d) => clearInterval(d['intervalId']));
        this.mediumTeams.forEach((d) => clearInterval(d['intervalId']));
        this.largeTeams.forEach((d) => clearInterval(d['intervalId']));
        this.hiringMgrs.forEach((d) => clearInterval(d['intervalId']));
        this.hrTeams.forEach((d) => clearInterval(d['intervalId']));
    }

    loadCompany() {
        this.developers = this.developers.map(
            (d) =>
                new Employee(
                    () => this.closeTickets(this.developerTicketCloseRate),
                    this.developerDelayMs
                )
        );
        this.smallTeams = this.smallTeams.map(
            (t) =>
                new Team(
                    () => this.closeTickets(this.smallTeamTicketCloseRate),
                    this.smallTeamDelayMs
                )
        );
        this.mediumTeams = this.mediumTeams.map(
            (t) =>
                new Team(
                    () => this.closeTickets(this.mediumTeamTicketCloseRate),
                    this.mediumTeamDelayMs
                )
        );
        this.largeTeams = this.largeTeams.map(
            (t) =>
                new Team(
                    () => this.closeTickets(this.largeTeamTicketCloseRate),
                    this.largeTeamDelayMs
                )
        );
        this.hiringMgrs = this.hiringMgrs.map(
            (hm) =>
                new Employee(() => {
                    if (this.canHireNewDeveloper()) this.hireNewDeveloper();
                }, this.hiringManagerDelayMs)
        );
        this.hrTeams = this.hrTeams.map(
            (t) =>
                new Team(() => {
                    if (this.canFormLargeTeam()) this.formLargeTeam();
                    else if (this.canFormMediumTeam()) this.formMediumTeam();
                    else if (this.canFormSmallTeam()) this.formSmallTeam();
                }, this.hrTeamDelayMs)
        );
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
        return this.developers.length >= this.smallTeamSize && this.smallTeams.length < this.maxSmallTeams;
    }

    canFormMediumTeam(): boolean {
        return this.smallTeams.length >= this.necessarySmallTeamsToFormMediumTeam && this.mediumTeams.length < this.maxMediumTeams;
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
        let buildingLimit = this.getEmployeeCountPerBuilding();
        let devsPerLargeTeam = this.smallTeamSize *
            this.necessarySmallTeamsToFormMediumTeam *
            this.necessaryMediumTeamsToFormLargeTeam;
        let largeTeamLimit = (buildingLimit / devsPerLargeTeam) * (this.buildingCount + 1);

        return this.mediumTeams.length >= this.necessaryMediumTeamsToFormLargeTeam &&
            this.largeTeams.length < largeTeamLimit;
    }

    getEmployeeCountPerBuilding(): number {
        return this.smallTeamSize *
            this.necessarySmallTeamsToFormMediumTeam *
            this.necessaryMediumTeamsToFormLargeTeam *
            this.necessaryLargeTeamsForNewHiringManager *
            this.necessaryHiringManagersForHRTeam *
            this.necessaryHrTeamsForNewBuilding;
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
        return this.capital >= this.newDeveloperCost && this.developers.length < this.maxIndividualContributors;
    }

    canHireNewHiringManager(): boolean {
        if (this.capital < this.newHiringManagerCost) return false;

        let requirement =
            Math.max(this.necessaryLargeTeamsForNewHiringManager,
                (this.getHiringManagerCount() + 1) * this.necessaryLargeTeamsForNewHiringManager +
                (this.hrTeams.length * this.necessaryHiringManagersForHRTeam * this.necessaryLargeTeamsForNewHiringManager));
        if (this.largeTeams.length >= requirement && this.hiringMgrs.length < this.maxHiringManagers) {
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
        let hrTeamPerBuildingLimit = Math.max(this.necessaryHrTeamsForNewBuilding, (this.buildingCount + 1) * this.necessaryHrTeamsForNewBuilding);
        return this.hiringMgrs.length >= this.necessaryHiringManagersForHRTeam &&
            this.hrTeams.length < hrTeamPerBuildingLimit;
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

    expandIntoNewBuilding(): void {
        if (!this.canExpandIntoNewBuilding()) return;
        this.capital -= this.newBuildingCost;
        this.capitalExpenditues += this.newBuildingCost;
        this.buildingCount++;
        this.newBuildingCost = this.calculateNewBuildingCost();
    }

    getBuildingCount(): number {
        return this.buildingCount;
    }

    canExpandIntoNewBuilding(): boolean {
        if (this.capital < this.newBuildingCost) return false;

        let requirement =
            Math.max(this.necessaryHrTeamsForNewBuilding,
                (this.buildingCount + 1) * this.necessaryHrTeamsForNewBuilding);
        if (this.hrTeams.length >= requirement) return true;
        return false;
    }

    /**
     * Returns a cost between the min and max new host cost, exclusively.
     */
    calculateNewBuildingCost(): number {
        let min = this.newBuildingCost - (this.newBuildingCost * this.newBuildingCostFluctuation);
        let max = this.newBuildingCost * (1 + this.newBuildingCostFluctuation);
        return Math.random() * (this.newBuildingCost - min) + max;
    }

    getNewBuildingCost(): number {
        return this.newBuildingCost;
    }

    getCapitalExpenses(): number {
        return this.capitalExpenditues;
    }
}