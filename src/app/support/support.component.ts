import { Component, OnInit } from '@angular/core';

import { SupportService } from '../services/support.service';
import { UserService } from '../services/user.service';
import { Message } from '../models/message';
import { LinkifyPipe } from './linkify.pipe';

const emailTemplate = `
<p>Dear customer,</p>
<p><br /></p>
<p>XXX</p>
<p><br /></p>
<p>Best regards,</p>
<p><strong>JAUC Cars</strong></p>
<p><br /></p>
`;
@Component({
    selector: 'app-support',
    templateUrl: 'support.component.html',
    styleUrls: ['support.component.scss'],
})
export class SupportComponent implements OnInit {
    public response = emailTemplate;
    public messages: Message[] = [];
    public selectedMessage: Message = null;
    public showResponse = false;

    constructor(private supportService: SupportService, private userService: UserService) {}
    ngOnInit(): void {
        this.supportService
            .getMessages()
            .snapshotChanges()
            .subscribe(items => {
                this.messages = [];
                items.forEach(element => {
                    const msg = element.payload.toJSON() as Message;

                    msg['$key'] = element.key;

                    if (!msg.userName) {
                        const searchUser = this.userService.getUserById(msg.userId);
                        msg['userName'] = searchUser ? searchUser.displayName : msg.userId;
                        msg['photoUrl'] = searchUser ? searchUser.photoUrl : null;
                        msg['email'] = searchUser ? searchUser.email : null;
                    }

                    this.messages.push(msg as Message);
                });

                // Sort messages, newest first
                this.messages.sort(function(a: Message, b: Message) {
                    return new Date(b.date).getDate() - new Date(a.date).getDate();
                });

                if (this.messages.length > 0 && !this.selectedMessage) {
                    this.selectedMessage = this.messages[0];
                    this.openMessage(this.selectedMessage);
                }
            });
    }

    onRespond() {
        this.showResponse = true;
    }

    messageClicked(message: Message) {
        this.openMessage(message);
    }

    openMessage(message: Message) {
        const key = message.$key;
        this.selectedMessage = message;
        this.showResponse = false;
        this.response = message.response || emailTemplate;

        if (!message.read) {
            this.supportService
                .readMessage(message)
                .then(msg => {
                    this.selectedMessage.read = true;
                    this.selectedMessage.$key = key;
                })
                .catch(reason => {
                    console.log(`Error reading message`, reason);
                });
        }
    }

    deleteMessage(message: Message) {
        this.supportService
            .deleteMessage(message)
            .then(() => {
                this.selectedMessage = null;
            })
            .catch(reason => {
                console.log(`Error deleting message`, reason);
            });
    }

    cancelResponse() {
        this.showResponse = false;
        this.response = emailTemplate;
    }

    sendResponse(message: Message) {
        const key = this.selectedMessage.$key;

        message.response = this.response;
        this.supportService
            .sendResponse(message)
            .then(() => {
                this.showResponse = false;
                this.selectedMessage.$key = key;
            })
            .catch(reason => {
                console.log(`Error sending response`, reason);
            });
    }
}
