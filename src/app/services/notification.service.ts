import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { User } from './../models/user';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    // readonly serviceAuth = "AIzaSyA7Q8ydCozmjWXl-ibwBq_CNqprXms-asQ";
    readonly serviceAuth =
        'AAAAcn46gXw:APA91bEid3uAuTCNYOs1JpA1_WioreUH-yE-T1MeDqkj0g9vTNC8pWF9RAXqn8NGT4weUJhNSoKMheA6lI93euubxQr0MyESRLLSkEqagYCPJEieNT7_2_ZS1uJ0Okb5cn97VjJCJQJh';

    constructor(private userService: UserService) {}

    public notify(user: string, title: string, body: string) {
        const userInfo: User = this.userService.getUserById(user);
        // Old URL
        const fcm = 'https://fcm.googleapis.com/fcm/send';
        // New URL
        // const fcm = "https://fcm.googleapis.com/v1/projects/jauc-ae38e/messages:send";

        if (userInfo.device === null) {
            return new Error('No push device registered.');
        }

        const payload = {
            to: `${userInfo.device}`,
            notification: {
                title,
                body,
            },
        };

        this.post(fcm, payload);
    }

    private post(url: any, data: Object = {}) {
        if (!url) {
            return new Error('No URL supplied, cannot execute fetch()');
        }

        console.log(data);

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `key=${this.serviceAuth}`,
            },
        })
            .then(res => res.json)
            .then(response => console.log('Notification success:', JSON.stringify(response)))
            .catch(error => console.log('Error', error));
    }
}
