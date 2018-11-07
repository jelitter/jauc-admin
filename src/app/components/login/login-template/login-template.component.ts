import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'jauc-login-template',
  templateUrl: './login-template.component.html',
  styleUrls: ['./login-template.component.css']
})
export class LoginTemplateComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit() {
  }
}
