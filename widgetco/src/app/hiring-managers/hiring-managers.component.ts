import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-hiring-managers',
  templateUrl: './hiring-managers.component.html',
  styleUrls: ['./hiring-managers.component.css']
})
export class HiringManagersComponent implements OnInit {
  company: any;
  newHireCost: number = 0;

  private readonly hiringManagerCostOverhead: number = 1.25;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompany().subscribe(company => this.company = company);
    this.newHireCost = this.getNewHireCost();
  }

  onNewHireClick(): void {
    let hired = this.companyService.hireNewHiringManager(this.newHireCost);
    if (hired) this.newHireCost = this.getNewHireCost();
  }

  private getNewHireCost(): number {
    return this.companyService.getNewHireCost() * this.hiringManagerCostOverhead;
  }

  canHireNewHiringManager(): Boolean {
    return this.companyService.canHireNewHiringManager(this.newHireCost);
  }
}
