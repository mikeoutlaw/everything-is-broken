import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-hr-team',
  templateUrl: './hr-team.component.html',
  styleUrls: ['./hr-team.component.css']
})
export class HrTeamComponent implements OnInit {

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
  }

  canFormHRTeam(): Boolean {
    return this.companyService.canFormHRTeam();
  }
}
