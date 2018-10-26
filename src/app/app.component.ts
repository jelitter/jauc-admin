import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
    selector: 'jauc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'JAUC Admin Panel';

    constructor(public user: UserService) {}
}
