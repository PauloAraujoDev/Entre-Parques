import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AuthGuard } from './auth.guard';
import { CommentsComponent } from './comments/comments.component';
import { ViagensComponent } from './viagens/viagens.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { ProvidersComponent } from './providers/providers.component';
import { CadastroPrestadoresComponent } from './cadastro-prestadores/cadastro-prestadores.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'unidades-conservacao', component: UnidadesconservacaoComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'redefine', component: RedefineComponent },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'comments/:name', component: CommentsComponent, canActivate: [AuthGuard] },
  { path: 'map-details/:name', component: MapDetailsComponent, canActivate: [AuthGuard] },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'viagens', component: ViagensComponent },
  { path: 'servicos', component: ProvidersComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-prestadores', component: CadastroPrestadoresComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

// Router
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
