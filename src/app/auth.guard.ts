import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { User } from './core/models/user/User';
import { CreateUser } from './actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {
  }

  userObservable: Observable<User>;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve: any) => {
      this.userObservable = this.store.select((appState: AppState) => appState.user);
      this.userObservable.subscribe((_user: User) => {
        if (!!_user && _user.idToken) {
          resolve(true);
        } else {
          if (!!localStorage.getItem('userDecoded')) {
            const userlocalStorage = JSON.parse(localStorage.getItem('userDecoded'));
            if (Date.now() / 1000 > userlocalStorage.exp) {
              this.router.navigate(['/login']);
              resolve(false);
            } else {
              this.store.dispatch(new CreateUser(JSON.parse(localStorage.getItem('user'))));
              resolve(true);
            }
          }
        }
      });

    });
  }
}
