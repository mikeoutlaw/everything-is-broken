import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-hiring-managers',
  templateUrl: './hiring-managers.component.html',
  styleUrls: ['./hiring-managers.component.css']
})
export class HiringManagersComponent implements OnInit {
  company: any;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompany().subscribe(company => this.company = company);
  }

  onNewHireClick(): void {
    this.companyService.hireNewHiringManager();
  }

  canHireNewHiringManager(): Boolean {
    return this.companyService.canHireNewHiringManager();
  }

  getHiringManagerCount(): number {
    return this.companyService.getHiringManagerCount();
  }
}
