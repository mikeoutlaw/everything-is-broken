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

  hireNewDeveloper(cost: number): Boolean {
    return this.company.hireNewDeveloper(this, cost);
  }

  hireNewHiringManager(cost: number): Boolean {
    return this.company.hireNewHiringManager(cost);
  }

  /**
   * Returns a cost between the min and max new host cost, exclusively.
   */
  getNewHireCost(): number {
    return Math.random() * (this.maxNewHireCost - this.minNewHireCost) + this.minNewHireCost;
  }

  formSmallTeam(): void {
    this.company.formSmallTeam(this);
  }

  canFormSmallTeam(): Boolean {
    return this.company.canFormSmallTeam();
  }

  canFormMediumTeam(): Boolean {
    return this.company.canFormMediumTeam();
  }

  formMediumTeam(): void {
    this.company.formMediumTeam(this);
  }

  canFormLargeTeam(): Boolean {
    return this.company.canFormLargeTeam();
  }

  formLargeTeam(): void {
    return this.company.formLargeTeam(this);
  }

  canHireNewHiringManager(cost: number): Boolean {
    return this.company.canHireNewHiringManager(cost);
  }
}
