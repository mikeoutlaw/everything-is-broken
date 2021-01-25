import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from './company';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  company$: Observable<Company> | undefined;
  title = 'widgetco';
  autoSave: any;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.tryLoadGame();
    this.company$ = this.companyService.getCompany();

    this.autoSave = setInterval(() => {
      this.companyService.saveGame();
    }, 500);
  }

  resetGame() {
    this.companyService.resetCompany();
  }
}
