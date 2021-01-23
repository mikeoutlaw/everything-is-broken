import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-small-teams',
  templateUrl: './small-teams.component.html',
  styleUrls: ['./small-teams.component.css']
})
export class SmallTeamsComponent implements OnInit {
  @Input() company: Company | undefined;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void { }

  onFormTeamClick(): void {
    this.companyService.formSmallTeam();
  }

  canFormTeam(): boolean {
    return this.companyService.canFormSmallTeam();
  }
}
