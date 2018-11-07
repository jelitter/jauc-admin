import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  authentication: any = null;
  error: Object = null;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    afAuth.auth.onAuthStateChanged(auth => (this.authentication = auth));
  }

  get authenticated(): boolean {
    return this.afAuth.authState !== null;
  }
  get currentUser(): User {
    return (this.authentication = this.authenticated ? this.afAuth.auth.currentUser : null);
  }
  get currentUserID(): string {
    return (this.authentication = this.authenticated ? this.afAuth.auth.currentUser.uid : null);
  }

  public loginWithGoogle() {
    const googleProvider = new auth.GoogleAuthProvider();
    this.afAuth.auth.setPersistence('session');
    this.afAuth.auth
      .signInWithPopup(googleProvider)
      .then(_ => this.goToRoute('/vehicles'))
      .catch(error => (this.error = error));
  }
  public logout() {
    this.afAuth.auth
      .signOut()
      .then(_ => this.goToRoute('/'))
      .catch(error => (this.error = error));
  }

  private goToRoute(path) {
    this.router.navigateByUrl(`${path}`);
  }
}
