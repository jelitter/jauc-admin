import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListTemplateComponent } from './car-list-template.component';

describe('CarListTemplateComponent', () => {
  let component: CarListTemplateComponent;
  let fixture: ComponentFixture<CarListTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarListTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
