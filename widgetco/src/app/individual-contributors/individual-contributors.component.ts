import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-individual-contributors',
  templateUrl: './individual-contributors.component.html',
  styleUrls: ['./individual-contributors.component.css']
})
export class IndividualContributorsComponent implements OnInit {
  company: any;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompany().subscribe(company => this.company = company);
  }

  canHireNewDeveloper(): Boolean {
    return this.companyService.canHireNewDeveloper();
  }

  onNewHireClick(): void {
    this.companyService.hireNewDeveloper();
  }
}
