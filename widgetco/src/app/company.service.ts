import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private company: Company = new Company();

  readonly maxNewHireCost: number = 10;
  readonly minNewHireCost: number = 3;

  constructor() { }

  closeTickets(numTickets: number): void {
    this.company.closeTickets(numTickets);
  }

  getCompany(): Observable<Company> {
    return of(this.company);
  }

  hireNewEmployee(cost: number): Boolean {
    return this.company.hireNewEmployee(this, cost);
  }

  /**
   * Returns a cost between the min and max new host cost, exclusively.
   */
  getNewHireCost(): number {
    return Math.random() * (this.maxNewHireCost - this.minNewHireCost) + this.minNewHireCost;
  }
}
