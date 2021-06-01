import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeiculoComponent } from './veiculo/veiculo.component';
import { VeiculoDetalheComponent } from './veiculo-detalhe/veiculo-detalhe.component';



@NgModule({
  declarations: [
    VeiculoComponent,
    VeiculoDetalheComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VeiculoModule { }
