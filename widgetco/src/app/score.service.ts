import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Score } from './score';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  score: Score = new Score();

  constructor() { }

  getScore(): Observable<Score> {
    return of(this.score);
  }

  incrementScore(amount: number = 1): void {
    this.score.current += amount;
  }
}
