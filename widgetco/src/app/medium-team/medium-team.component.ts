import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-medium-team',
  templateUrl: './medium-team.component.html',
  styleUrls: ['./medium-team.component.css']
})
export class MediumTeamComponent implements OnInit {
  @Input() company: Company | undefined;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void { }

  onFormTeamClick(): void {
    this.companyService.formMediumTeam();
  }

  canFormTeam(): boolean {
    return this.companyService.canFormMediumTeam();
  }
}
