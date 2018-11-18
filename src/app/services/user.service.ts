import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    displayName;
    photoURL;

    uid = this.afAuth.authState.pipe(
        map(authState => {
            if (!authState) {
                return null;
            }
            this.displayName = authState.displayName;
            this.photoURL = authState.photoURL;
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

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {}

    loginWithGoogle = () => {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    loginWithFacebook = () => {
        this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    }

    logout = () => {
        this.afAuth.auth.signOut();
    }
}
