import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProvidersServices, Operation } from './providers-service';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { User } from '../core/models/user/User';
import { Observable } from 'rxjs';
import { Prestadores, Services } from '../core/models/prestadores/prestador.model';
import { UnidadesConservacao } from '../core/models/unidades-conservacao/unidadesConservacao';
import { cp } from '@angular/core/src/render3';

@Component({
  selector: 'app-cadastro-prestadores',
  templateUrl: './cadastro-prestadores.component.html',
  styleUrls: ['./cadastro-prestadores.component.css']
})
export class CadastroPrestadoresComponent implements OnInit {

  prestadores: Prestadores | undefined = new Prestadores();
  services: Services | undefined = new Services();
  urlBase: string | null = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/';
  unidadesConservacao: UnidadesConservacao[];
  operation: Operation = Operation.Add;
  operationService: Operation = Operation.Add;
  hasPermission: any;
  userLocation: User;
  servicesForProviders: any;
  states: any;
  currentState: string;
  cities: any;
  displaysUserServices: Services[];
  serviceSelected: Services;
  stateName: any;


  constructor(private db: AngularFirestore,
    private providerService: ProvidersServices,
    protected http: HttpClient,
    private store: Store<AppState>) {
  }

  ngOnInit() {
    this.providerService.listServicesForProvider().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Prestadores;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe((response: any) => { this.servicesForProviders = response; });

    this.store.select((state: AppState) => state.user).subscribe((user: User) => {
      this.userLocation = user;
    });

    this.loadUnidadesConservacao();
    this.getStateForCountry();
    this.getCitiesForStates();
    this.validateProviderAuthorization();
    this.retriveProfile();
    this.findServiceProviders();
  }

  loadUnidadesConservacao(): void {
    this.db.collection('unidades-conservacao').valueChanges().pipe(
      map((action) => action)).subscribe((unidadesConservacaoResponse: UnidadesConservacao[]) => {
        this.unidadesConservacao = unidadesConservacaoResponse;
      });
  }

  retriveProfile(): void {
    this.db.collection<Prestadores>('providers').
      snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Prestadores;
            const id = a.payload.doc['id'];
            return { id, ...data };
          });
        })).subscribe((response: Prestadores[]) => {
          this.prestadores = (!!response) ? (response.find(x => x.email === this.userLocation.email) ?
          response.find(x => x.email === this.userLocation.email) : new Prestadores()) : new Prestadores();

          console.log(this.prestadores);
        });
  }

  validateProviderAuthorization(): void {
    this.db.collection('checksProviders').valueChanges().pipe(
      map((action) => action)).subscribe((responseCheckProvider: any[]) => {
        this.hasPermission = responseCheckProvider.find(x => x.email === this.userLocation.email);
      });
  }

  findServiceProviders(): void {
    this.db.collection<Services>('services').
    snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Services;
          const id = a.payload.doc['id'];
          return { id, ...data };
        });
      })).subscribe((response: Services[]) => {
        this.displaysUserServices = (!!response) ? response.filter(x => x.email === this.userLocation.email) : undefined;
      });
  }

  getStateForCountry() {
    this.http.get(this.urlBase).subscribe((response: any) => {
      this.states = response;
    });
  }

  getCitiesForStates() {
    this.http.get(`${this.urlBase}${this.currentState}/municipios`).subscribe((response: any) => {
      this.cities = response;
    });
    this.http.get(`${this.urlBase}${this.currentState}`).subscribe((response2: any) => {
      this.stateName = response2;
    });
  }

  onChangeState(state) {
    this.currentState = state;
    this.getCitiesForStates();
  }

  addOrUpdateProfileProvider() {
    this.prestadores.email = this.userLocation.email;
    this.prestadores.state = this.stateName.nome;
    this.prestadores.stateSigla = this.stateName.sigla;
    this.prestadores.image = this.userLocation.image;
    this.providerService.addOrUpdateService(this.prestadores, this.operation);
  }

  changeOperationEdit() {
    this.operation = Operation.Edit;
  }

  addOrUpdateServices() {
    if (this.operationService === Operation.Add) {
      this.services.email = this.userLocation.email;
      this.providerService.addOrUpdateServiceUc(this.services, Operation.Add);
    } else {
      this.providerService.addOrUpdateServiceUc(this.services, Operation.Edit);
    }
  }

  changeOperationForService(service: Services, operationService: Operation) {
    this.operationService = operationService === 1 ? Operation.Add : Operation.Edit;
    this.services =  operationService === 1 ? new Services() : service;
  }

  eliminar(item) {
    this.providerService.eliminarItem(item);
  }

}
