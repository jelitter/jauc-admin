import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Rythm from 'rythm.js';
@Component({
    selector: 'app-navbar',
    // templateUrl: './navbar.component.html',
    template: `
        <mat-toolbar color="primary">
            <mat-toolbar-row #toolbarRow>
                <a class="nav-button" mat-button [routerLink]="['/']"> <h3 id="title">JAUC Admin</h3> </a>
                <a
                    class="nav-button"
                    mat-button
                    *ngFor="let link of links"
                    [routerLink]="link.routerLink"
                    [routerLinkActive]="['mat-button-toggle-checked', 'active-route']"
                    #rla="routerLinkActive"
                >
                    {{ link.label }}
                </a>

                <a mat-button (click)="toggleMusic()" class="rythm-bass">
                    <i class="{{ !rythm.stopped ? 'fas fa-volume-up' : 'fas fa-volume-mute' }}" matTooltip="Music!"></i>
                </a>

                <div class="spacer"></div>

                <div *ngIf="user.displayName as displayName">
                    <mat-chip-list>
                        <mat-chip *ngIf="(user.isAdmin | async)" color="primary" selected class="rythm-bass">
                            <i class="fas fa-hammer rythm-medium" matTooltip="Administrator"></i>
                        </mat-chip>
                        <span class="display-name"> {{ user.displayName }} </span>
                    </mat-chip-list>
                </div>
                <div *ngIf="(user.uid | async) as uid; else: login" matTooltip="Logged In">
                    <p-menu #menu [popup]="true" [model]="menuItems"></p-menu>
                    <img
                        id="profilePic"
                        [src]="user.photoURL"
                        alt="photo"
                        (click)="menu.toggle($event)"
                        class="rythm-high"
                    />
                </div>

                <ng-template #login> <app-login></app-login> </ng-template>
            </mat-toolbar-row>
        </mat-toolbar>
    `,
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    rythm;
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
                    label: route.path.toUpperCase(),
                });
            }
        }
        this.activeItem = this.links[0];

        this.menuItems = [
            { label: 'Logout', icon: 'pi pi-fw pi-user', command: this.user.logout },
            { label: 'Profile', icon: 'pi pi-fw pi-user-plus' },
        ];
        this.initializeMusic();
    }

    initializeMusic() {
        // https://okazari.github.io/Rythm.js/
        this.rythm = new Rythm();
        this.rythm.stopped = true;

        this.rythm.addRythm('btn', 'shake', 0, 10);
        this.rythm.addRythm('nav-button', 'pulse3', 0, 10);
        this.rythm.addRythm('edit-button', 'borderWidth1', 0, 10);
        this.rythm.addRythm('delete-button', 'borderWidth2', 0, 10);
        this.rythm.addRythm('location-badge', 'borderColor', 0, 10, {
            from: [255, 255, 0],
            to: [255, 0, 0],
        });
        this.rythm.addRythm('leaflet-marker-icon', 'color', 0, 10, {
            from: [0, 0, 255],
            to: [255, 0, 255],
        });
        this.rythm.addRythm('display-name', 'swing', 0, 5, {
            direction: 'left',
            curve: 'down',
        });
        this.rythm.addRythm('header-name', 'swing', 0, 5, {
            direction: 'left',
        });
        this.rythm.addRythm('header-plate', 'swing', 0, 5, {
            curve: 'up',
        });
        this.rythm.addRythm('header-location', 'swing', 0, 5, {
            direction: 'right',
        });
    }

    toggleMusic() {
        if (!this.rythm.stopped) {
            this.rythm.stop();
        } else {
            const song = `../../assets/music/song${Math.floor(Math.random() * 7 + 1)}.mp3`;
            this.rythm.setMusic(song);
            this.rythm.setGain(0.1);
            this.rythm.start();
        }
    }
}
