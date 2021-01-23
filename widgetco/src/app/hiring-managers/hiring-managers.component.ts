import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-hiring-managers',
  templateUrl: './hiring-managers.component.html',
  styleUrls: ['./hiring-managers.component.css']
})
export class HiringManagersComponent implements OnInit {
  @Input() company: Company | undefined;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void { }

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
