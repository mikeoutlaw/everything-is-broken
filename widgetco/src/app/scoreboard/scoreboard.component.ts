import { Component, OnInit } from '@angular/core';
import { Score } from '../score';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-score',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreBoardComponent implements OnInit {
  score: Score = new Score();

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.getScore();
  }

  getScore(): void {
    this.scoreService.getScore().subscribe(score => this.score = score);
  }
}
