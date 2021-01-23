import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualContributorsComponent } from './individual-contributors.component';

describe('IndividualContributorsComponent', () => {
  let component: IndividualContributorsComponent;
  let fixture: ComponentFixture<IndividualContributorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualContributorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualContributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
