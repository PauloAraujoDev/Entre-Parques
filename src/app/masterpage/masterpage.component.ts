import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { User } from '../core/models/user/User';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Component({
  selector: 'app-masterpage',
  templateUrl: './masterpage.component.html',
  styleUrls: ['./masterpage.component.css']
})
export class MasterpageComponent implements OnInit {
  visible = true;
  user: Observable<User>;
  __user: User;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.visible = event.urlAfterRedirects === '/login' ? false : true;
      }
    });

    this.user = this.store.select((state: AppState) => state.user);
    this.user.subscribe((user: User) => {
      this.__user = user;
      console.log(this.__user);
    });

  }
}
