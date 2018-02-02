import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import * as firebase from 'firebase';
import {fromPromise} from 'rxjs/observable/fromPromise';

import * as fromAuthActions from './auth.actions';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$
    .ofType(fromAuthActions.TRY_SIGNUP)
    .map((action: fromAuthActions.TrySignUp) => {
      const payload = {
        username: action.userName,
        password: action.password
      };
      return payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/recipes']);
      return [
        new fromAuthActions.SignUp(),
        new fromAuthActions.SetToken(token)
      ];
    });

  @Effect()
  authSignIn = this.actions$
    .ofType(fromAuthActions.TRY_SIGNIN)
    .map((action: fromAuthActions.TrySignIn) => {
      const payload = {
        username: action.userName,
        password: action.password
      };
      return payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      console.log(token);
      this.router.navigate(['/recipes']);
      return [
        new fromAuthActions.SignIn(),
        new fromAuthActions.SetToken(token)
      ];
    });

  constructor(private actions$: Actions, private router: Router) {}
}
