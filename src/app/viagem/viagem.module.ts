import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {NgxMaskModule} from 'ngx-mask';
import {ViagemRoutingModule} from './viagem-routing.module';
import {ViagemService} from './viagem.service';
import {ViagemDetalheComponent} from './viagem-detalhe/viagem-detalhe.component';
import { ViagemComponent } from './viagem/viagem.component';



@NgModule({
  declarations: [
    ViagemComponent,
    ViagemDetalheComponent
  ],
  exports: [
    ViagemComponent,
    ViagemDetalheComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    NgxMaskModule,
    ViagemRoutingModule
  ], providers:[
    ViagemService
  ]
})
export class ViagemModule { }
