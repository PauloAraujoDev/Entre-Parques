import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPrestadoresComponent } from './cadastro-prestadores.component';

describe('CadastroPrestadoresComponent', () => {
  let component: CadastroPrestadoresComponent;
  let fixture: ComponentFixture<CadastroPrestadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPrestadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPrestadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
