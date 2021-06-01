import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargaComponent } from './carga/carga.component';
import { CargaDetalheComponent } from './carga-detalhe/carga-detalhe.component';



@NgModule({
  declarations: [
    CargaComponent,
    CargaDetalheComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CargaModule { }
