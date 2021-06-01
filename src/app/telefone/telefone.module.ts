import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelefoneComponent } from './telefone/telefone.component';
import { TelefoneDetalheComponent } from './telefone-detalhe/telefone-detalhe.component';



@NgModule({
  declarations: [
    TelefoneComponent,
    TelefoneDetalheComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TelefoneModule { }
