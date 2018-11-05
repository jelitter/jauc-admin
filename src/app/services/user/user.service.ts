import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: Observable<User | null>;
  error: String = null; // state is nice to reflect in a UI

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
        this.user = this.afAuth.authState.pipe(
            switchMap(user => {
            if (user) {
                return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
            } else {
                return observableOf(null);
            }
        })
        // would be nice to persist in local storage or sth
    );
  }

  loginWithGoogle() {
    const googleProvider = new auth.GoogleAuthProvider();
    this.afAuth.auth
      .signInWithPopup(googleProvider)
      .then(_ => this.goToRoute('/vehicles'))
      .catch(error => (this.error = error));
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(this.user = null)
      .then(_ => this.goToRoute('/'))
      .catch(error => (this.error = error));
  }

  goToRoute(path) {
    this.router.navigateByUrl(path);
  }
}
