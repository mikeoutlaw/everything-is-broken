import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-small-teams',
  templateUrl: './small-teams.component.html',
  styleUrls: ['./small-teams.component.css']
})
export class SmallTeamsComponent implements OnInit {
  company: any;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompany().subscribe(company => this.company = company);
  }

  onFormTeamClick(): void {
    this.companyService.formSmallTeam();
  }
}
