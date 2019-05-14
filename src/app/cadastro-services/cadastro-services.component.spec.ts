import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroServicesComponent } from './cadastro-services.component';

describe('CadastroServicesComponent', () => {
  let component: CadastroServicesComponent;
  let fixture: ComponentFixture<CadastroServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
