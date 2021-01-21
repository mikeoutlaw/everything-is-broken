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
    this.company.ticketsClosed += numTickets;
  }

  getCompany(): Observable<Company> {
    return of(this.company);
  }

  hireNewEmployee(cost: number): void {
    this.company.hireNewEmployee(this, cost);
  }
}
