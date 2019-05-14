import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { UnitTestEntreParquesComponent } from './unit-test-entre-parques.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { doesNotThrow } from 'assert';
import { AngularFireDatabase } from '@angular/fire/database';

fdescribe('Teste Unitario Entre Parques App', () => {
  let component: UnitTestEntreParquesComponent;
  let fixture: ComponentFixture<UnitTestEntreParquesComponent>;
  let db: AngularFirestore;
  let data: Array<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitTestEntreParquesComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [AngularFirestore]

    })
    .compileComponents();
  }));

  beforeEach((done) => {
    fixture = TestBed.createComponent(UnitTestEntreParquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    db = TestBed.get(AngularFirestore);

    db.collection('unidades-conservacao').valueChanges().pipe(
      map((action) => action)).subscribe((response: any[]) => {
        data = response;
        done();
      });
  });


  it('[Aplicação]: Entre-Parques - [Componente]: List Unidades Conservação - [Cenário]: Imagem Carijós', () => {
    data.forEach(element => {
      if ( element.name === 'Carijós') {
        expect(element.pathImage[0]).toBeTruthy();
      }
    });
  });

  it('[Aplicação]: Entre-Parques - [Componente]: Lista Unidades Conservação - [Cenário]: Imagem  Morro da Pedreira', () => {
    data.forEach(element => {
      if ( element.name === 'Morro da Pedreira') {
        expect(element.pathImage[0]).toBeTruthy();
      }
    });
  });


  it('[Aplicação]: Entre-Parques - [Componente]: Details Unidades Conservação - [Cenário]: Atrativos para o Parque Carijós', () => {
    data.forEach(element => {
      if ( element.name === 'Morro da Pedreira') {
        expect(element.attractive[0]).toBeTruthy();
      }
    });
  });

  it('[Aplicação]: Entre-Parques - [Componente]: Details Unidades Conservação - [Cenário]: Perigos para o Parque Morro da Pedreira', () => {
    data.forEach(element => {
      if ( element.name === 'Morro da Pedreira') {
        expect(element.warnings[0]).toBeTruthy();
      }
    });
  });

  it('[Aplicação]:Entre-Parques - [Componente] :Mapas - [Cenário]: Localização Latitude Morro da Pedreira', () => {
    data.forEach(element => {
      if ( element.name === 'Morro da Pedreira') {
        expect(element.position._lat).toBeTruthy();
      }
    });
  });

  it('[Aplicação]:Entre-Parques - [Componente]: Mapas - [Cenário]: Localização Longitude Morro da Pedreira', () => {
    data.forEach(element => {
      if ( element.name === 'Morro da Pedreira') {
        expect(element.position._long).toBeTruthy();
      }
    });
  });
});


