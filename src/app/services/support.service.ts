import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Message } from '../models/message';
import 'rxjs/add/operator/take';
import { of } from 'rxjs/internal/observable/of';

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
            });
    }

    getMessages() {
        return this.messages;
    }

    readMessage(message: Message) {
        const key = message.$key;
        delete message.$key;
        message.read = true;
        return this.firebase.list('support').update(key, message);
    }

    sendResponse(message: Message) {
        const key = message.$key;
        delete message.$key;
        return this.firebase.list('support').update(key, message);
    }

    deleteMessage(message: Message) {
        return this.firebase.list('support').remove(message.$key);
    }
}
