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
import {CargaRoutingModule} from './carga-routing.module';
import {CargaService} from './carga.service';
import {CargaComponent} from './carga/carga/carga.component';
import {CargaDetalheComponent} from './carga-detalhe/carga-detalhe.component';



@NgModule({
  declarations: [
    CargaComponent,
    CargaDetalheComponent
  ],
  exports: [
    CargaComponent,
    CargaDetalheComponent
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
    CargaRoutingModule
  ], providers:[
    CargaService
  ]
})
export class CargaModule { }
