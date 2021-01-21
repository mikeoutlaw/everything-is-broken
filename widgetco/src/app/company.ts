import { CompanyService } from "./company.service";
import { Employee } from "./employee";

export class Company {
    employees: Employee[] = [];
    hiringBudget: number = 5;
    ticketsClosed: number = 0;
    personnelCost: number = 0;

    constructor() {}

    hireNewEmployee(companyService: CompanyService, cost: number): void {
        if (cost > this.hiringBudget) return; // maybe throw an error?

        this.employees.push(new Employee(companyService));
        this.hiringBudget -= cost;
        this.personnelCost += cost;
    }
}
