import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser
} from 'angular-6-social-login';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { CreateUser } from '../actions/user.actions';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService, private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
  }

  socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData: SocialUser) => {
        if (!!userData) {
          this.store.dispatch(new CreateUser(userData));
          const decoded = jwt_decode(userData.idToken);
          localStorage.setItem('userDecoded', JSON.stringify(decoded));
          localStorage.setItem('user', JSON.stringify(userData));
          // console.log(Date.now() / 1000 > token.exp);  false is not expired
          this.router.navigate(['/menu']);
        }
      }
    );
  }

}
