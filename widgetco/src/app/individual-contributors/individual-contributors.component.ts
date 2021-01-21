import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-individual-contributors',
  templateUrl: './individual-contributors.component.html',
  styleUrls: ['./individual-contributors.component.css']
})
export class IndividualContributorsComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
  }

  onNewHireClick(): void {
    this.employees.push(new Employee(this.scoreService));
  }
}
