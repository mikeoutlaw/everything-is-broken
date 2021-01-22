import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreBoardComponent implements OnInit {
  company: any; // any seems like a code smell here

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany(): void {
    this.companyService.getCompany().subscribe(company => this.company = company);
  }
}
