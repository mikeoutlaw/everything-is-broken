import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit {

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
  }

  expandIntoNewBuilding(): void {
    this.companyService.expandIntoNewBuilding();
  }

  getBuildingCount(): number {
    return this.companyService.getBuildingCount();
  }

  canExpandIntoNewBuilding(): boolean {
    return this.companyService.canExpandIntoNewBuilding();
  }

  getNewBuildingCost(): number {
    return this.companyService.getNewBuildingCost();
  }
}
