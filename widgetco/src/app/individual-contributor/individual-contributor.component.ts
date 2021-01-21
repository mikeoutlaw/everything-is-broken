import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-individual-contributor',
  templateUrl: './individual-contributor.component.html',
  styleUrls: ['./individual-contributor.component.css']
})
export class IndividualContributorComponent implements OnInit {

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.scoreService.incrementScore();
  }
}
