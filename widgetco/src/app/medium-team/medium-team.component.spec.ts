import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumTeamComponent } from './medium-team.component';

describe('MediumTeamComponent', () => {
  let component: MediumTeamComponent;
  let fixture: ComponentFixture<MediumTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediumTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
