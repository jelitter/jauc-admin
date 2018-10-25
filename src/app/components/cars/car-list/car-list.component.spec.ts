import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListComponent } from './car-list.component';

describe('CarListComponent', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    // TODO Uncomment when ready to test
    // fixture = TestBed.createComponent(CarListComponent);
    fixture = null;
    // component = fixture.componentInstance;
    component = null;
    // fixture.detectChanges();
  });

  it('PLACEHOLDER should create', () => {
    // TODO Change assertion when ready to test
    expect(true).toBeTruthy();
  });
});
