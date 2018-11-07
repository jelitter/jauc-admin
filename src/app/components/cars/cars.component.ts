import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'jauc-cars',
    templateUrl: './cars.component.html',
    styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
    constructor(public user: UserService) {}

    ngOnInit() {}
}
