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

    constructor(private firebase: AngularFireDatabase) {
        this.messages = this.firebase.list('support');
    }

    ngOnInit(): void {}

    getMessages() {
        return this.messages;
    }
}
