import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOverviewComponent } from './review-overview.component';

describe('ReviewOverviewComponent', () => {
  let component: ReviewOverviewComponent;
  let fixture: ComponentFixture<ReviewOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
