import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeTeamComponent } from './large-team.component';

describe('LargeTeamComponent', () => {
  let component: LargeTeamComponent;
  let fixture: ComponentFixture<LargeTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
