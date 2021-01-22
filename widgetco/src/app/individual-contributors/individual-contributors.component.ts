import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-individual-contributors',
  templateUrl: './individual-contributors.component.html',
  styleUrls: ['./individual-contributors.component.css']
})
export class IndividualContributorsComponent implements OnInit {
  company: any;
  newHireCost: number = 5;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompany().subscribe(company => this.company = company);
  }

  onNewHireClick(): void {
    let hired = this.companyService.hireNewDeveloper(this.newHireCost);
    if (hired) this.newHireCost = this.companyService.getNewHireCost();
  }
}
