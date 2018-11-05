import { UserService } from 'src/app/services/user/user.service';
import { Component } from '@angular/core';

@Component({
    selector: 'login-form',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent {
    constructor(userService: UserService) {}

    service = UserService;

    loginWithGoogle(): void {
        this.service.loginWithGoogle();
    }
}
