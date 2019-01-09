import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Car } from '../models/car';
import { Location } from '../models/location';
import 'rxjs/add/operator/take';
import { randomCorkCoords } from './shared';
import { Message } from '../models/message';
import { of } from 'rxjs';

@Injectable()
export class SupportService implements OnInit {
    public messages: AngularFireList<any> = null;
    public messageList: Message[] = [];

    constructor(private firebase: AngularFireDatabase) {
        this.messages = this.firebase.list('support');
    }

    ngOnInit(): void {
        this.firebase
            .list('support')
            .snapshotChanges()
            .subscribe(items => {
                this.messageList = [];
                items.forEach(item => {
                    const m = item.payload.toJSON();
                    m['$key'] = item.key;
                    this.messageList.push(m as Message);
                });
                console.log(`Message List`, this.messageList);
            });
    }

    getMessages() {
        return this.messages;
    }

    // updateMessage(message: Message) {
    //     const key = message.$key;
    //     delete message.$key;
    //     return this.messages.update(key, message);
    //     console.log(`Updating message ${key}`, message);
    // }

    readMessage(message: Message) {
        const key = message.$key;
        delete message.$key;
        message.read = true;
        console.log(`support service, reading msg...`, message);

        this.firebase
            .list('support')
            .update(key, message)
            .then(updatedMessage => {
                console.log(`message updated`, updatedMessage);
            });
    }
}
