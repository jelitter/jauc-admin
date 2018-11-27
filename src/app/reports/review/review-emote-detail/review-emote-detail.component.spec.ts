import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEmoteDetailComponent } from './review-emote-detail.component';

describe('ReviewEmoteDetailComponent', () => {
  let component: ReviewEmoteDetailComponent;
  let fixture: ComponentFixture<ReviewEmoteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewEmoteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewEmoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
