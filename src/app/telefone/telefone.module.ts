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
import {TelefoneRoutingModule} from './telefone-routing.module';
import {TelefoneService} from './telefone.service';
import {TelefoneDetalheComponent} from './telefone-detalhe/telefone-detalhe.component';
import { TelefoneComponent } from './telefone/telefone.component';



@NgModule({
  declarations: [
    TelefoneComponent,
    TelefoneDetalheComponent
  ],
  exports: [
    TelefoneComponent,
    TelefoneDetalheComponent
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
    TelefoneRoutingModule
  ], providers:[
    TelefoneService
  ]
})
export class TelefoneModule { }
