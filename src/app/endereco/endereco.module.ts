import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnderecoComponent } from './endereco/endereco.component';
import { EnderecoDetalheComponent } from './endereco-detalhe/endereco-detalhe.component';



@NgModule({
  declarations: [
    EnderecoComponent,
    EnderecoDetalheComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EnderecoModule { }
