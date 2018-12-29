import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    userList: AngularFireList<any>;
    userArray: User[] = [];

    displayName = null;
    photoURL = null;
    email = null;
    key = null;

    uid = this.afAuth.authState.pipe(
        map(authState => {
            if (!authState) {
                return null;
            }
            this.displayName = authState.displayName;
            this.photoURL = authState.photoURL;
            this.email = authState.email;
            this.key = authState.uid;
            this.addOrUpdateUser();

            return authState.uid;
        })
    );

    isAdmin: Observable<boolean> = this.uid.pipe(
        switchMap(uid => {
            if (!uid) {
                return observableOf(false);
            } else {
                return this.db.object<boolean>('/admins/' + uid).valueChanges();
            }
        })
    );

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
        this.userList = this.db.list('users');

        this.userList.snapshotChanges().subscribe(users => {
            this.userArray = [];
            users.forEach(el => {
                const u = el.payload.toJSON() as User;
                // car['$key'] = el.key;
                this.userArray.push(u);
            });
            // console.log('User Array', this.userArray);
        });
    }

    loginWithGoogle = () => {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    loginWithFacebook = () => {
        this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    }

    logout = () => {
        this.afAuth.auth.signOut();
        this.displayName = null;
        this.photoURL = null;
        this.email = null;
        this.key = null;
    }

    private addOrUpdateUser() {
        const user = new User(this.key, this.displayName, this.email, this.photoURL);

        const key = user.key;
        // delete user.key;

        const searchUser = this.getUserById(key);

        if (!searchUser) {
            // console.log(`New user added`, user);
            this.userList.update(key, user);
        }
    }

    getUserById(key: string) {
        return this.userArray.find(u => u.key === key);
    }
}
