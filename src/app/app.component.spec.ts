import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';

import { AppComponent } from './app.component';
import { CarsComponent } from './components/cars/cars.component';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from '@angular/material/grid-list';

@Component({ selector: 'jauc-car', template: '' })
class MockCarComponent {}

@Component({ selector: 'jauc-cars', template: '' })
class MockCarsComponent {}

@Component({ selector: 'jauc-car-list', template: '' })
class MockCarListComponent {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, CarsComponent, MockCarComponent, MockCarListComponent],
      imports: [
        MatIconModule,
        MatToolbarModule,
        MatTabsModule,
        MatCardModule,
        MatGridListModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'JAUC Admin Panel'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('JAUC Admin Panel');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('JAUC Admin Panel');
  });
});
