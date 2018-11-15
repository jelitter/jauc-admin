import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  // templateUrl: './navbar.component.html',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row #toolbarRow>
        <a mat-button [routerLink]="['/']"> <h3 id="title">JAUC Admin</h3> </a>
        <a
          mat-button
          *ngFor="let link of links"
          [routerLink]="link.routerLink"
          [routerLinkActive]="['mat-button-toggle-checked', 'active-route']"
          #rla="routerLinkActive"
        >
          {{ link.label }}
        </a>
        <div class="spacer"></div>

        <div *ngIf="user.displayName as displayName">
          <mat-chip-list>
            <mat-chip *ngIf="(user.isAdmin | async)" color="primary" selected
              ><i class="fas fa-hammer" matTooltip="Administrator"></i
            ></mat-chip>
            {{ user.displayName }}
          </mat-chip-list>
        </div>
        <div *ngIf="(user.uid | async) as uid; else: login" matTooltip="Logged In">
          <p-menu #menu [popup]="true" [model]="menuItems"></p-menu>
          <img id="profilePic" [src]="user.photoURL" alt="photo" (click)="menu.toggle($event)" />
        </div>

        <ng-template #login> <app-login></app-login> </ng-template>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  links: MenuItem[];
  activeItem: MenuItem;
  menuItems: MenuItem[];

  constructor(private router: Router, public user: UserService) {}

  ngOnInit() {
    this.links = [];
    for (const route of this.router.config) {
      if (route.path && route.component) {
        this.links.push({
          routerLink: `/${route.path}`,
          label: route.path.toUpperCase()
        });
      }
    }
    this.activeItem = this.links[0];

    this.menuItems = [
      { label: 'Logout', icon: 'pi pi-fw pi-user', command: this.user.logout },
      { label: 'Profile', icon: 'pi pi-fw pi-user-plus' }
    ];
  }
}
