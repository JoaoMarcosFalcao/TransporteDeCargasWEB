import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViagemComponent } from './viagem/viagem.component';
import { ViagemDetalheComponent } from './viagem-detalhe/viagem-detalhe.component';



@NgModule({
  declarations: [
    ViagemComponent,
    ViagemDetalheComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ViagemModule { }
