import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private company: Company = new Company();

  constructor() { }

  closeTickets(numTickets: number): void {
    this.company.closeTickets(numTickets);
  }

  getCompany(): Observable<Company> {
    return of(this.company);
  }

  hireNewDeveloper(): void {
    this.company.hireNewDeveloper();
  }

  hireNewHiringManager(): void {
    this.company.hireNewHiringManager();
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

  canHireNewDeveloper(): Boolean {
    return this.company.canHireNewDeveloper();
  }

  canHireNewHiringManager(): Boolean {
    return this.company.canHireNewHiringManager();
  }

  getIndividualContributorCount(): number {
    return this.company.getIndividualContributorCount();
  }

  getHiringManagerCount(): number {
    return this.company.getHiringManagerCount();
  }
}
