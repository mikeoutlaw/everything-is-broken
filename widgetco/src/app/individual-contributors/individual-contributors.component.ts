import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-individual-contributors',
  templateUrl: './individual-contributors.component.html',
  styleUrls: ['./individual-contributors.component.css']
})
export class IndividualContributorsComponent implements OnInit {
  newHireCost: number = 5;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
  }

  onNewHireClick(): void {
    let hired = this.companyService.hireNewEmployee(this.newHireCost);
    if (hired) this.newHireCost = this.companyService.getNewHireCost();
  }
}
