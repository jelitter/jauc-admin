import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'jauc-login-template',
  templateUrl: './login-template.component.html',
  styleUrls: ['./login-template.component.css']
})
export class LoginTemplateComponent {

  user: Observable<User>;

  constructor(userService: UserService) {
    this.user = userService.user;
  }

}
