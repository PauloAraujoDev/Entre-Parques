import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MasterpageComponent } from './masterpage/masterpage.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { UnidadesconservacaoComponent } from './unidadesconservacao/unidadesconservacao.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RedefineComponent } from './redefine/redefine.component';
import { MapComponent } from './map/map.component';
import { MapDetailsComponent } from './map-details/map-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { reducerUnits } from './reducers/unidades-conservacao.reducers';
import { reducerUser } from './reducers/user.reducer';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  AuthService,
} from 'angular-6-social-login';
import { CommentsComponent } from './comments/comments.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderPipe } from './order.pipe';
import { ViagensComponent } from './viagens/viagens.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { UnitTestEntreParquesComponent } from './unit-test-entre-parques/unit-test-entre-parques.component';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ClimaHereService } from './clima-here.service';
import { MomentPipe } from './moment.pipe';
import { ProvidersComponent } from './providers/providers.component';
import { CadastroPrestadoresComponent } from './cadastro-prestadores/cadastro-prestadores.component';
import { CadastroServicesComponent } from './cadastro-services/cadastro-services.component';
// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('470069408277-90j7k2mp9k290l9qih75spbmjhsja04p.apps.googleusercontent.com')
      }
    ]);

  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    MasterpageComponent,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    UnidadesconservacaoComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    RedefineComponent,
    MapComponent,
    MapDetailsComponent,
    CommentsComponent,
    OrderPipe,
    ViagensComponent,
    NotFoundComponent,
    SearchComponent,
    UnitTestEntreParquesComponent,
    MomentPipe,
    NotFoundComponent,
    ProvidersComponent,
    CadastroPrestadoresComponent,
    CadastroServicesComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      unitsConservation: reducerUnits,
      user: reducerUser
    }),
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,

    HttpClientModule, HttpClientJsonpModule


  ],
  providers:
    [{
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
      AuthService,
      AngularFirestore,
      AngularFireDatabase,
      HttpClientModule,
      HttpClientJsonpModule
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
