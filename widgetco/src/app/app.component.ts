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

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.company$ = this.companyService.getCompany();
  }
}
