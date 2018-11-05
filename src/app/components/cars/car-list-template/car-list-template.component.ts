import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'jauc-car-list-template',
  templateUrl: './car-list-template.component.html',
  styleUrls: ['./car-list-template.component.css'],
})
export class CarListTemplateComponent implements OnInit {
  user: Observable<User>;

  constructor(userService: UserService) {
    this.user = userService.user;
  }

  ngOnInit() {}
}
