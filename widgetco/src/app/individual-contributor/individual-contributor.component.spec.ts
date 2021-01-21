import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualContributorComponent } from './individual-contributor.component';

describe('IndividualContributorComponent', () => {
  let component: IndividualContributorComponent;
  let fixture: ComponentFixture<IndividualContributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualContributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button', () => {
    const fixture = TestBed.createComponent(IndividualContributorComponent);
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button')).toBeTruthy();
  });
});
