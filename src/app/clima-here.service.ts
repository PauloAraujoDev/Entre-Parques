import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClimaHereService {
  appId: string;
  appCode: string;
  w_url: string;
  w_lang: string;
  weather: any;


  public constructor(private http: HttpClient) {
    this.appId = 'tx5eE3vtBLSxf6AhWvNC';
    this.appCode = 'ptO_NF3BUeYCuf7OVwsm-g';
    this.w_lang = 'pt-BR';
    this.weather = [];
  }
  getClima(position: any, dias: number): any {
    return new Promise(resolve => {
      this.w_url = 'https://weather.api.here.com/weather/1.0/report.json?' +
        'product=forecast_7days_simple&' +
        '&app_id=' + this.appId +
        '&app_code=' + this.appCode +
        '&latitude=' + position.coords.latitude +
        '&longitude=' + position.coords.longitude +
        '&language=' + this.w_lang;
      this.http.jsonp(this.w_url, 'jsonpCallback')
        .pipe(map(result => (<any>result).dailyForecasts.forecastLocation))
        .subscribe(result => {
          this.weather = result.forecast;
          this.weather.splice(dias);
          resolve(this.weather);
        }, error => {
          console.error(error);
        });
    });
  }
}
