import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    display = false;

    constructor(public user: UserService) {}

    ngOnInit() {}

    handleSignin(): void {
        this.display = true;

        // console.log('Login clicked');
    }
}
