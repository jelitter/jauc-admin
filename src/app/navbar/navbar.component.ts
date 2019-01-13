import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Rythm from 'rythm.js';
import { SupportComponent } from '../support/support.component';
import { SupportService } from '../services/support.service';
import { Message } from '../models/message';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    unreadMessages = 0;
    rythm;
    links: MenuItem[];
    activeItem: MenuItem;
    menuItems: MenuItem[];

    constructor(private router: Router, public user: UserService, private supportService: SupportService) {}

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

        this.supportService
            .getMessages()
            .snapshotChanges()
            .subscribe(items => {
                this.unreadMessages = 0;
                items.forEach(element => {
                    const msg = element.payload.toJSON() as Message;
                    if (!msg.read) {
                        this.unreadMessages++;
                    }
                });
            });

        // this.supportService.unreadMessages.subscribe(val => {
        //     this.unreadMessages = val;
        //     console.log(`unread messages changed`);
        //     console.log({ val });
        //     console.log({ unreadMessages: this.unreadMessages });
        // });
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
