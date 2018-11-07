import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'jauc-nav-anchor-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    constructor(private userService: UserService) {}

    logout() {
        this.userService.logout();
    }

    ngOnInit() {
    }

}
