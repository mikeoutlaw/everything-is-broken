import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-large-team',
  templateUrl: './large-team.component.html',
  styleUrls: ['./large-team.component.css']
})
export class LargeTeamComponent implements OnInit {
  @Input() company: Company | undefined;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void { }

  onFormTeamClick(): void {
    this.companyService.formLargeTeam();
  }

  canFormTeam(): Boolean {
    return this.companyService.canFormLargeTeam();
  }
}
