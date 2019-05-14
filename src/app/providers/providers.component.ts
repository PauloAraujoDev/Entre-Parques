import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  constructor(private db: AngularFirestore, private router: Router) { }

  items: any[];

  ngOnInit() {
    this.db.collection('providers').valueChanges().pipe(
      map((action) => action)).subscribe((response: any) => {
        this.items = response;
      });
  }
}


