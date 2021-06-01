import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefoneDetalheComponent } from './telefone-detalhe.component';

describe('TelefoneDetalheComponent', () => {
  let component: TelefoneDetalheComponent;
  let fixture: ComponentFixture<TelefoneDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelefoneDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefoneDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
