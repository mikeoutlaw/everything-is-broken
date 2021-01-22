import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private company: Company = new Company();
  private ticketValue: number = .15;

  readonly maxNewHireCost: number = 10;
  readonly minNewHireCost: number = 3;

  constructor() { }

  closeTickets(numTickets: number): void {
    this.company.ticketsClosed += numTickets;
    this.company.hiringBudget += numTickets * (Math.random() * (((.17 - .08 + 1) + .08)));
  }

  getCompany(): Observable<Company> {
    return of(this.company);
  }

  hireNewEmployee(cost: number): void {
    this.company.hireNewEmployee(this, cost);
  }

  /**
   * Returns a cost between the min and max new host cost, exclusively.
   */
  getNewHireCost(): number {
    return Math.random() * (this.maxNewHireCost - this.minNewHireCost) + this.minNewHireCost;
  }
}
