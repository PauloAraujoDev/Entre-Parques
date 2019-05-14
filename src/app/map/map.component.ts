/// <reference types='googlemaps' />
/// <reference path='../../../node_modules/@types/googlemaps/index.d.ts' />
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { CreateUnitsConservation } from '../actions/unidades-conservacao.action';
import { AngularFirestore } from '@angular/fire/firestore';
import { CalculateDistanceService } from '../calculate-distance.service';
import { trigger, state, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({
        opacity: 0.7
      })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('3s')
      ]),
      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate('3s', style({ opacity: 0 })))

    ])]
})
export class MapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  imageSelected = '';
  details: any;
  isInformationAvailable = true;
  distance = '';
  directionsDisplay: any;

  constructor(private router: Router,
    private store: Store<AppState>,
    private db: AngularFirestore,
    private calculeteService: CalculateDistanceService) { }

  ngOnInit() {
    // navigator.geolocation.getCurrentPosition(this.displayLocationInfo.bind(this));
    this.displayLocationInfo();
  }

  // CallBack
  displayLocationInfo(): void {
    const mapProp = {
      center: new google.maps.LatLng(localStorage.latitude, localStorage.longitude),
      zoom: 3,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      styles: [
        {
          'featureType': 'administrative' as google.maps.MapTypeStyleFeatureType,
          'elementType': 'all' as google.maps.MapTypeStyleElementType,
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },

        {
          'featureType': 'administrative.province' as google.maps.MapTypeStyleFeatureType,
          'elementType': 'labels.text' as google.maps.MapTypeStyleElementType,
          'stylers': [
            {
              'visibility': 'on'
            }
          ]
        },

        {
          'featureType': 'administrative.country' as google.maps.MapTypeStyleFeatureType,
          'elementType': 'labels.text' as google.maps.MapTypeStyleElementType,
          'stylers': [
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'administrative' as google.maps.MapTypeStyleFeatureType,
          'elementType': 'labels.text.fill' as google.maps.MapTypeStyleElementType,
          'stylers': [
            {
              'color': '#444444'
            }
          ]
        },
        {
          'featureType': 'landscape' as google.maps.MapTypeStyleFeatureType,
          'elementType': 'all' as google.maps.MapTypeStyleElementType,
          'stylers': [
            {
              'color': '#e7e3e3'
            },
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'landscape' as google.maps.MapTypeStyleFeatureType,
          'elementType': 'geometry' as google.maps.MapTypeStyleElementType,
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'landscape' as google.maps.MapTypeStyleFeatureType,
          'elementType': 'labels' as google.maps.MapTypeStyleElementType,
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'poi' as google.maps.MapTypeStyleFeatureType,
          'elementType': 'all' as google.maps.MapTypeStyleElementType,
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road' as google.maps.MapTypeStyleFeatureType,
          'elementType': 'all' as google.maps.MapTypeStyleElementType,
          'stylers': [
            {
              'saturation': -100
            },
            {
              'lightness': 45
            },
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road.highway' as google.maps.MapTypeStyleFeatureType,
          'elementType': 'all' as google.maps.MapTypeStyleElementType,
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road.arterial' as google.maps.MapTypeStyleFeatureType,
          'elementType': 'labels.icon' as google.maps.MapTypeStyleElementType,
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'transit' as google.maps.MapTypeStyleFeatureType,
          'elementType': 'all' as google.maps.MapTypeStyleElementType,
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'water' as google.maps.MapTypeStyleFeatureType,
          'elementType': 'all' as google.maps.MapTypeStyleElementType,
          'stylers': [
            {
              'color': '#89c8e9'
            },
            {
              'visibility': 'on'
            }
          ]
        }
      ]
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: '#008d4c' } });
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions({ suppressMarkers: true });

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    const image = {
      url: 'https://i.ibb.co/4TS6jRJ/tree.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(30, 30),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate..
    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };

    this.markerPoint({
      position: { latitude: localStorage.latitude, longitude: localStorage.longitude },
      image: 'https://i.ibb.co/xSYb3CG/mypostion.png'
    }, shape);

    this.db.collection('unidades-conservacao').valueChanges().subscribe((response: any) => {
      response.forEach(item => {
        if (!!item.position) {
          this.markerPoint({
            name: item.name, position: { latitude: item.position._lat, longitude: item.position._long },
            image: image
          }, shape, item);
        }
      });
    });
  }

  markerPoint(item, shape, details?: any): void {

    const path = (!!details) ? 'M112 316.94v156.69l22.02 33.02c4.75 7.12 15.22 7.12 19.97 0L176 473.63V316.94c-10.39 1.92-21.06 3.06' +
      '-32 3.06s-21.61-1.14-32-3.06zM144 0C64.47 0 0 64.47 0 144s64.47 144 144 144 144-64.47 144-144S223.53 0 144 0zm0' +
      ' 76c-37.5 0-68 30.5-68 68 0 6.62-5.38 12-12 12s-12-5.38-12-12c0-50.73 41.28-92 92-92 6.62 0 12 5.38 12 12s-5.38 12-12 12z' :
      'M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4' +
      '-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9' +
      '6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z';

    const icon = {

      path: path,
      fillOpacity: 1.0,
      anchor: new google.maps.Point(0, 0),
      strokeWeight: 0,
      scale: 0.03,
      fillColor: '#008d4c',
    };

    if (item.position.latitude && item.position.longitude) {
      // Set Inital markers on maps;
      const latlng = new google.maps.LatLng(item.position.latitude, item.position.longitude);

      const marker = new google.maps.Marker({
        position: latlng,
        title: item.name,
        icon: icon,
        shape: shape
      });

      marker.setMap(this.map);

      google.maps.event.addListener(marker, 'click', () => {
        this.isInformationAvailable = true;
        if (!!details) {
          this.store.dispatch(new CreateUnitsConservation(details));
          this.imageSelected = details.pathImage[0];
          this.details = details;
          this.isInformationAvailable = false;
          this.calculeteService.calculateDistance(localStorage.latitude,
            localStorage.longitude, details.position._lat, details.position._long,
            google.maps.TravelMode.DRIVING).then((response) => {
              this.distance = response.rows[0].elements[0].distance.text;
            });
          this.calculeteService.calculateRoute(localStorage.latitude, localStorage.longitude,
            this.details.position.latitude, this.details.position.longitude, google.maps.TravelMode.DRIVING).then(response => {
              this.directionsDisplay.setDirections(response);
            });
          // this.router.navigate(['/map-details', item.name]);
        }
      });
    }
  }

  getUrl(): string {
    return `url(${this.imageSelected})`;
  }

}
