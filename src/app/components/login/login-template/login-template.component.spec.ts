import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTemplateComponent } from './login-template.component';

describe('LoginTemplateComponent', () => {
  let component: LoginTemplateComponent;
  let fixture: ComponentFixture<LoginTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
