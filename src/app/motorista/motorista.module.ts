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
import {MotoristaRoutingModule } from './motorista-routing.module';
import { MotoristaComponent } from './motorista/motorista.component';
import { MotoristaDetalheComponent } from './motorista-detalhe/motorista-detalhe.component';
import {MotoristaService} from './motorista.service';


@NgModule({
  declarations: [
    MotoristaComponent,
    MotoristaDetalheComponent
  ],
  exports: [
    MotoristaComponent,
    MotoristaDetalheComponent
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
    MotoristaRoutingModule
  ], providers:[
    MotoristaService
  ]
})
export class MotoristaModule { }
