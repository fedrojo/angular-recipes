import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  initialize() {
    if (this.isAuthenticated()) {
      firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => this.token = token
        );
    }
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        () => this.router.navigate(['/'])
      )
      .catch(
        error => console.log(error)
      );
  }
  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
        }
      )
      .catch(
        error => console.log(error)
      );
  }
  signoutUser() {
    this.token = null;
    firebase.auth().signOut();
    this.router.navigate(['/']);
  }
  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return (firebase.auth().currentUser != null);
  }
}
