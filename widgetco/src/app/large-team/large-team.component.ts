import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-large-team',
  templateUrl: './large-team.component.html',
  styleUrls: ['./large-team.component.css']
})
export class LargeTeamComponent implements OnInit {
  company: any;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompany().subscribe(company => this.company = company);
  }

  onFormTeamClick(): void {
    this.companyService.formLargeTeam();
  }

  canFormTeam(): Boolean {
    return this.companyService.canFormLargeTeam();
  }
}
