import { Component, OnInit } from '@angular/core';

import { SupportService } from '../services/support.service';
import { UserService } from '../services/user.service';
import { Message } from '../models/message';

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

    constructor(private support: SupportService, private userService: UserService) {}
    ngOnInit(): void {
        this.support
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
                if (this.messages.length > 0) {
                    this.openMessage(this.messages[0]);
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
        this.showResponse = false;
        this.response = emailTemplate;
        message.read = true;
        this.selectedMessage = { ...message };
        // this.support.updateMessage(message).then(() => {
        //     console.log(`New Selected Message`, this.selectedMessage);
        // });
    }

    cancelResponse() {
        this.showResponse = false;
        this.response = emailTemplate;
    }

    sendResponse(message: Message) {
        console.log('Send response', this.response);
    }
}
