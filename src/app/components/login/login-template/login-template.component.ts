import { UserService } from 'src/app/services/user/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'jauc-login-template',
  templateUrl: './login-template.component.html',
  styleUrls: ['./login-template.component.css']
})
export class LoginTemplateComponent {

  uid = null;

  constructor(userService: UserService) {
    this.uid = userService.uid;
  }

}
