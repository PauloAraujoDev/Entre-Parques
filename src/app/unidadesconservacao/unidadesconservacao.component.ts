import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { CalculateDistanceService } from '../calculate-distance.service';
import { Router } from '@angular/router';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-unidadesconservacao',
  templateUrl: './unidadesconservacao.component.html',
  styleUrls: ['./unidadesconservacao.component.css'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [animate('0.5s ease-in'), style({ transform: 'translateX(-100%)' })]),
      transition(':leave', [animate('0.5s ease-out', style({ transform: 'translateX(100%)' }))])
    ]),
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(2000)),
    ])]
})
export class UnidadesconservacaoComponent implements OnInit {

  items: any[];
  itemsFromDB: any[];
  hiddenEmptyResults = true;
  attractives$;
  temp: any[] = [];

  constructor(private db: AngularFirestore,
    private calculeteService: CalculateDistanceService, private router: Router) { }

  ngOnInit(): void {
    // navigator.geolocation.getCurrentPosition(this.displayLocationInfo.bind(this));
    this.displayLocationInfo();
    this.attractives$ = this.db.collection('unidades-conservacao').valueChanges();
  }

  onSearchChange(filters: any): void {
    this.temp = [];
    Object.keys(filters).forEach(key => {
      this.items = (!!filters) ? this.itemsFromDB.filter(x =>
        (filters['state'] ? x.state.toLocaleUpperCase().startsWith(filters['state'].toLocaleUpperCase()) : true) &&
        (filters['name'] ? x.name.toLocaleUpperCase().startsWith(filters['name'].toLocaleUpperCase()) : true)
      ) : this.itemsFromDB;
    });

    if (!!filters['attractives'] && filters['attractives'].length > 0) {
      this.items.forEach(item => {
        let foundAttractive: any;
        let hasValues = true;

        filters['attractives'].forEach(filter => {
          if (!!item.attractive && item.attractive.length > 0) {
            foundAttractive = item.attractive.find(x => x.name === filter);
            if (!foundAttractive) {
              hasValues = false;
            }
          } else {
            hasValues = false;
          }
        });

        if (hasValues) {
          this.temp.push(item);
        }

      });
      this.items = this.temp;
    }
    this.hiddenEmptyResults = (!!this.items) ? ((this.items[0] && this.items[0].name) ? true : false) : false;
  }

  calculateAndSortDistance(): void {
    this.itemsFromDB.forEach(item => {
      if (!!item.position) {
        this.calculeteService.calculateDistance(localStorage.latitude,
          localStorage.longitude,
          item.position._lat,
          item.position._long,
          google.maps.TravelMode.DRIVING).then((response) => {
            item['distanceText'] = response.rows[0].elements[0].distance.text;
            item['distanceNumb'] = response.rows[0].elements[0].distance.value;


            this.items.sort((leftPosition, rightPosition) => {
              if (leftPosition.distanceNumb > rightPosition.distanceNumb) {
                return 1;
              }

              if (leftPosition.distanceNumb < rightPosition.distanceNumb) {
                return -1;
              }
              return 0;
            });
          });
      }
    });
  }
  // CallBack.
  displayLocationInfo(): void {
    this.db.collection('unidades-conservacao').valueChanges().pipe(
      map((action) => action)).subscribe((response: any) => {
        this.itemsFromDB = response;
        this.items = this.itemsFromDB;
        this.calculateAndSortDistance();
        console.log(this.items);
      });
  }
  knowMore(name: string): void {
    this.router.navigate(['/map-details', name]);
  }
}

