import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-individual-contributors',
  templateUrl: './individual-contributors.component.html',
  styleUrls: ['./individual-contributors.component.css']
})
export class IndividualContributorsComponent implements OnInit {

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
  }

  onNewHireClick(): void {
    this.companyService.hireNewEmployee(1);
  }
}
