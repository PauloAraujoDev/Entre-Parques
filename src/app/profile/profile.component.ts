/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../core/models/user/User';
import { profile } from '../core/profile/profile';
import { Profile } from '../core/models/profile/profile';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  profile: Profile;
  profileGoogle?: any | null;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    if (!!localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    // if (!!localStorage.getItem('userDecoded')) {
    //   const userDecoded = JSON.parse(localStorage.getItem('userDecoded'));
    //   this.profile = profile.find(x => x.email === userDecoded.email);
    // }

    this.db.collection('profiles').valueChanges().pipe(
      map((action) => action)).subscribe((response: any[]) => {
        this.profile = response.find(x => x.email === this.user.email);
        console.log(this.profile);
      });
  }

  renderPicture(s): void {

  }

}

