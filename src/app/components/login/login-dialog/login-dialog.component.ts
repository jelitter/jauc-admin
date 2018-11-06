import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jauc-login-form',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.css'],
})

export class LoginDialogComponent implements OnInit {
    service;

    constructor(userService: UserService) {
        this.service = userService;
    }

    ngOnInit() {
    }

    loginWithGoogle() {
        this.service.loginWithGoogle();
    }
}
