import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuthActions from './store/auth.actions';
import {SignIn, SignUp} from './store/auth.actions';

@Injectable()
export class AuthService {

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  signupUser (email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        user => {
          this.store.dispatch(new SignUp());
          firebase.auth().currentUser.getIdToken()
            .then((token: string) => {
              this.store.dispatch(new fromAuthActions.SetToken(token));
            });
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  signinUser (email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.store.dispatch(new SignIn());
        firebase.auth().currentUser.getIdToken()
          .then((token: string) => {
            this.store.dispatch(new fromAuthActions.SetToken(token));
            this.router.navigate(['/recipes']);
          });
      })
      .catch(
        error => console.log(error)
      );
  }

  logOut() {
    firebase.auth().signOut();
    this.store.dispatch(new fromAuthActions.LogOut());
  }
}
