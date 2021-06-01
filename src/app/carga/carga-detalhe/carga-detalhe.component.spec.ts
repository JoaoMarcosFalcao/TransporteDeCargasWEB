import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaDetalheComponent } from './carga-detalhe.component';

describe('CargaDetalheComponent', () => {
  let component: CargaDetalheComponent;
  let fixture: ComponentFixture<CargaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
