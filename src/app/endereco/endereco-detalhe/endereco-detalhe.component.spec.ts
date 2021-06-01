import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoDetalheComponent } from './endereco-detalhe.component';

describe('EnderecoDetalheComponent', () => {
  let component: EnderecoDetalheComponent;
  let fixture: ComponentFixture<EnderecoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnderecoDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnderecoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
