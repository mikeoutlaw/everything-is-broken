import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private company: Company = new Company();
  private company$ = new BehaviorSubject(this.company);

  constructor() { }

  resetCompany() {
    this.company.reset();
    this.company = new Company();
    this.company$.next(this.company);
  }

  tryLoadGame() {
    const loadedGameString = localStorage.getItem('save');
    if (!loadedGameString) {
      return;
    }

    const loadedCompany = JSON.parse(loadedGameString);
    for (const key in loadedCompany) {
      (this.company as any)[key] = loadedCompany[key];
    }
    this.company.loadCompany();
  }

  saveGame() {
    localStorage.setItem('save', JSON.stringify(this.company));
  }

  closeTickets(numTickets: number): void {
    this.company.closeTickets(numTickets);
  }

  getCompany(): Observable<Company> {
    return this.company$;
  }

  hireNewDeveloper(): void {
    this.company.hireNewDeveloper();
  }

  hireNewHiringManager(): void {
    this.company.hireNewHiringManager();
  }

  formSmallTeam(): void {
    this.company.formSmallTeam();
  }

  canFormSmallTeam(): boolean {
    return this.company.canFormSmallTeam();
  }

  canFormMediumTeam(): boolean {
    return this.company.canFormMediumTeam();
  }

  formMediumTeam(): void {
    this.company.formMediumTeam();
  }

  canFormLargeTeam(): boolean {
    return this.company.canFormLargeTeam();
  }

  formLargeTeam(): void {
    return this.company.formLargeTeam();
  }

  canHireNewDeveloper(): boolean {
    return this.company.canHireNewDeveloper();
  }

  canHireNewHiringManager(): boolean {
    return this.company.canHireNewHiringManager();
  }

  getIndividualContributorCount(): number {
    return this.company.getIndividualContributorCount();
  }

  getHiringManagerCount(): number {
    return this.company.getHiringManagerCount();
  }

  canFormHRTeam(): boolean {
    return this.company.canFormHRTeam();
  }

  formHrTeam(): void {
    this.company.formHrTeam();
  }

  getEmployeeCount(): number {
    return this.company.getEmployeeCount();
  }

  expandIntoNewBuilding(): void {
    return this.company.expandIntoNewBuilding();
  }

  getBuildingCount(): number {
    return this.company.getBuildingCount();
  }

  canExpandIntoNewBuilding(): boolean {
    return this.company.canExpandIntoNewBuilding();
  }

  getNewBuildingCost(): number {
    return this.company.getNewBuildingCost();
  }

  getCapitalExpenses(): number {
    return this.company.getCapitalExpenses();
  }
}
