import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoristaDetalheComponent } from './motorista-detalhe.component';

describe('MotoristaDetalheComponent', () => {
  let component: MotoristaDetalheComponent;
  let fixture: ComponentFixture<MotoristaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotoristaDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotoristaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
