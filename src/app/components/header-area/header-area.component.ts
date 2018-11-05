import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-area',
  templateUrl: './header-area.component.html',
  styleUrls: ['./header-area.component.css']
})
export class HeaderAreaComponent {

  title = 'JAUC Admin Panel';

  constructor(public user: UserService, private titleService: Title) {
    this.titleService.setTitle('JAUC Admin Panel');
  }

}
