import { Component, OnInit } from '@angular/core';
import { Score } from '../score';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  score: Score = new Score();

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.getScore();
  }

  getScore(): void {
    this.scoreService.getScore().subscribe(score => this.score = score);
  }
}
