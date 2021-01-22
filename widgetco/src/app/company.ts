import { CompanyService } from "./company.service";
import { Employee } from "./employee";

export class Company {
    employees: Employee[] = [];
    hiringBudget: number = 5;
    ticketsClosed: number = 0;
    personnelCost: number = 0;

    readonly maxTicketValue: number = .18;
    readonly minTicketValue: number = .07;

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
}
