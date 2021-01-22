import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallTeamsComponent } from './small-teams.component';

describe('SmallTeamsComponent', () => {
  let component: SmallTeamsComponent;
  let fixture: ComponentFixture<SmallTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
