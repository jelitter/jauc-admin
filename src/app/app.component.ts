import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'jauc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'JAUC Admin Panel';

    constructor(public user: UserService, private titleService: Title) {
        this.titleService.setTitle('JAUC Admin Panel');
    }
}
