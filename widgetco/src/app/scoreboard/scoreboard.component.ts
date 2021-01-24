import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreBoardComponent implements OnInit {
  @Input() company: Company | undefined;

  wfhMessage = 'Yay, work from home!!!'

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
  }

  getEmployeeCount(): number {
    return this.companyService.getEmployeeCount();
  }

  getCapitalExpenses(): number {
    let capex = this.companyService.getCapitalExpenses();
    if (capex > 0) this.wfhMessage = '';
    return capex;
  }
}
