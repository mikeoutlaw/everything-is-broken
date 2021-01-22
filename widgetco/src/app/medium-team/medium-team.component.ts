import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-medium-team',
  templateUrl: './medium-team.component.html',
  styleUrls: ['./medium-team.component.css']
})
export class MediumTeamComponent implements OnInit {
  company: any;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompany().subscribe(company => this.company = company);
  }

  onFormTeamClick(): void {
    this.companyService.formMediumTeam();
  }

  canFormTeam(): Boolean {
    return this.companyService.canFormMediumTeam();
  }
}
