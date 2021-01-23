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

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany(): void {
    this.companyService.getCompany().subscribe(company => this.company = company);
  }
}
