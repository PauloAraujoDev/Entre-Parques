import { Component, OnInit, ViewChild } from '@angular/core';
import { CalculateDistanceService } from '../calculate-distance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadesConservacao } from '../core/models/unidades-conservacao/unidadesConservacao';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ClimaHereService } from '../clima-here.service';
import * as moment from 'moment';
import { Ranking } from '../core/models/ranking/ranking.model';
import { User } from '../core/models/user/User';
moment.locale('pt-BR');

@Component({
  selector: 'app-map-details',
  templateUrl: './map-details.component.html',
  styleUrls: ['./map-details.component.css']
})
export class MapDetailsComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  origin: '';
  destination: '';
  distance: '';
  durationCar: '';
  durationWalk: '';
  durationBike: '';
  disableButtonComments = true;

  currentEmail: string | null;
  currentRate: number;
  currentRateGlobally: number;
  ranking: Ranking;

  details: UnidadesConservacao;
  unitsConservation$: Observable<UnidadesConservacao[]>;
  climaok: any = [];

  constructor(private calculeteService: CalculateDistanceService,
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router, private db: AngularFirestore,
    private climaHere: ClimaHereService) {
  }

  ngOnInit() {
    this.climaHere.w_lang = moment.locale();
    this.activeRoute.params.subscribe((params => {
      this.store.select((state: AppState) => state.user).subscribe((user: User) => {
        this.currentEmail = user.email;
        this.retriveUserHearts(params['name']);
      });
      if (params['name']) {
        this.db.collection('unidades-conservacao').valueChanges().subscribe((response: any) => {
          this.details = response.find(x => x.name === params['name']);
          // navigator.geolocation.getCurrentPosition(this.displayLocationInfo.bind(this));
          this.displayLocationInfo();
          this.db.collection('comments').valueChanges().pipe(
            map((action) => action)).subscribe((res: any[]) => {
              if (!!res.find(x => x.name === params['name'])) {
                this.disableButtonComments = false;
              }
            });
        });
      } else {
        this.router.navigate(['/map']);
      }
    }));

    this.unitsConservation$ = this.store.select(state => state.unitsConservation);
    this.unitsConservation$.subscribe((units: UnidadesConservacao[]) => {

    });
  }

  displayLocationInfo(): void {
    const _coord = {
      'coords': {
        'latitude': this.details.position.latitude,
        'longitude': this.details.position.longitude
      }
    };
    this.climaHere.getClima(_coord, 3).then(response => {
      this.climaok = response;
    });

    this.calculeteService.calculateDistance(localStorage.latitude, localStorage.longitude,
      this.details.position.latitude, this.details.position.longitude, google.maps.TravelMode.DRIVING).then(response => {
        this.origin = response.originAddresses[0];
        this.destination = response.destinationAddresses[0];
        this.distance = response.rows[0].elements[0].distance.text;
        this.durationCar = response.rows[0].elements[0].duration.text;
      });

    this.calculeteService.calculateDistance(localStorage.latitude, localStorage.longitude,
      this.details.position.latitude, this.details.position.longitude, google.maps.TravelMode.WALKING).then(response => {
        this.durationWalk = response.rows[0].elements[0].duration.text;
      });

    this.calculeteService.calculateDistance(localStorage.latitude, localStorage.longitude,
      this.details.position.latitude, this.details.position.longitude, google.maps.TravelMode.BICYCLING).then(response => {
        this.durationBike = response.rows[0].elements[0].duration.text;
      });
  }

  findComments(): void {
    this.router.navigate(['/comments', this.details.name]);
  }

  formato(data: any): string {
    return moment(data).format('dd');
  }

  retriveUserHearts(park: string): void {
    this.db.collection('ranking').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Ranking;
          const id = a.payload.doc['id'];
          return { id, ...data };
        });
      })).subscribe((response: Ranking[]) => {
        this.ranking = (!!response) ? response.find(x => x.name === park) : undefined;
        if (!!this.ranking) {
          this.calculateAvarege(this.ranking);
          if (!!this.ranking.ranking.find(y => y.email === this.currentEmail)) {
            this.drawHearts(this.ranking.ranking.find(y => y.email === this.currentEmail).value);
          }
        } else {
          this.db.collection('ranking').add({ name: park, ranking: [] });
        }
      });
  }

  drawHearts(numHearts: number): void {
    this.currentRate = numHearts;
  }

  updateHeartsOnFireStore(): void {
    let hasHearts = true;
    this.ranking.ranking.forEach(element => {
      if (element.email === this.currentEmail) {
        element.value = this.currentRate;
        hasHearts = false;
      }
    });
    if (hasHearts) {
      this.ranking.ranking.push({ email: this.currentEmail, value: this.currentRate });
    }

    this.db.collection('ranking').doc(this.ranking.id).set({ ranking: this.ranking.ranking }, { merge: true });
  }
  calculateAvarege(items: Ranking): void {
    let tempRating = 0;
    items.ranking.forEach(element => {
      tempRating += element['value'];
    });
    this.currentRateGlobally = (tempRating / items.ranking.length);
  }
}
