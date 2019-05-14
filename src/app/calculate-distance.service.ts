/// <reference types='googlemaps' />

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateDistanceService {

  constructor() { }

  calculateDistance(originLat, originLong, destinationLat, destionationLong, travelMode: google.maps.TravelMode): Promise<any> {
     return new Promise(resolve => {
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [new google.maps.LatLng(originLat, originLong )],
          destinations: [new google.maps.LatLng(destinationLat, destionationLong)],
          travelMode: travelMode
        }, (r, s) => { resolve(r); });
     });
  }

  calculateRoute(originLat, originLong, destinationLat, destionationLong, travelMode: google.maps.TravelMode): Promise<any> {
    return new Promise(resolve => {
     const service = new google.maps.DirectionsService();
     service.route(
       {
         origin: new google.maps.LatLng(originLat, originLong ),
         destination: new google.maps.LatLng(destinationLat, destionationLong),
         travelMode: travelMode
       }, (r, s) => { resolve(r); });
    });
 }

}
