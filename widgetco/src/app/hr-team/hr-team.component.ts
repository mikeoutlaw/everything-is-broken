import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-hr-team',
  templateUrl: './hr-team.component.html',
  styleUrls: ['./hr-team.component.css']
})
export class HrTeamComponent implements OnInit {
  @Input() company: Company | undefined;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
  }

  canFormHRTeam(): boolean {
    return this.companyService.canFormHRTeam();
  }

  formHrTeam(): void {
    this.companyService.formHrTeam();
  }
}
