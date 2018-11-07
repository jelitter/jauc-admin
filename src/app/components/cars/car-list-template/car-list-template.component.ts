import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jauc-car-list-template',
  templateUrl: './car-list-template.component.html',
  styleUrls: ['./car-list-template.component.css'],
})
export class CarListTemplateComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }
}
