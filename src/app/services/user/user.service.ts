import { first, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: Observable<User> = this.currentUser;
  initialised: boolean = false;
  error: Object = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  get currentUser(): any {
    // check if initialised and if not, pull data from Promise
    return this.initialised ? this.afAuth.auth.currentUser : this.loadState();
  }

  public loginWithGoogle(): void {
    const googleProvider = new auth.GoogleAuthProvider();
    this.afAuth.auth.setPersistence('session');
    this.afAuth.auth
      .signInWithPopup(googleProvider)
      .then(_ => this.goToRoute(['/vehicles']))
      .catch(error => (this.error = error));
  }
  public logout(): void {
    this.afAuth.auth
      .signOut()
      .then(_ => this.goToRoute(['/']))
      .catch(error => (this.error = error));
  }

  isAuthenticated() {
    return this.afAuth.authState.pipe(first()).toPromise()
  }
  private async loadState() {
    const userCred = await this.isAuthenticated();
    if (userCred) {
      this.initialised = true;
      return userCred;
    } else {
      return null;
    }
  }
  private goToRoute(path) {
    this.router.navigateByUrl(`${path}`);
  }
}
