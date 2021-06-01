import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotaComponent } from './rota/rota.component';
import { RotaDetalheComponent } from './rota-detalhe/rota-detalhe.component';



@NgModule({
  declarations: [
    RotaComponent,
    RotaDetalheComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RotaModule { }
