import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-individual-contributors',
  templateUrl: './individual-contributors.component.html',
  styleUrls: ['./individual-contributors.component.css']
})
export class IndividualContributorsComponent implements OnInit {
  @Input() company: Company | undefined;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
  }

  canHireNewDeveloper(): Boolean {
    return this.companyService.canHireNewDeveloper();
  }

  onNewHireClick(): void {
    this.companyService.hireNewDeveloper();
  }

  getIndividualContributorCount(): number {
    return this.companyService.getIndividualContributorCount();
  }
}
