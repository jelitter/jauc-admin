import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        // TODO Uncomment when ready to test
        // fixture = TestBed.createComponent(LoginComponent);
        // component = fixture.componentInstance;
        // fixture.detectChanges();
        fixture = null;
        component = null;
    });

    /*
    it('PLACEHOLDER should create', () => {
        // TODO Change assertion when ready to test
        expect(true).toBeTruthy();
    });
    */
});
