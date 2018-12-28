import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
    user = null;

    constructor(public us: UserService) {
        this.user = this.us.uid;
    }

    ngOnInit() {}
}
