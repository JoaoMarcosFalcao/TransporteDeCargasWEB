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
import {EnderecoRoutingModule } from './endereco-routing.module';
import { EnderecoComponent } from './endereco/endereco.component';
import { EnderecoDetalheComponent } from './endereco-detalhe/endereco-detalhe.component';
import {EnderecoService} from './endereco.service';


@NgModule({
  declarations: [
    EnderecoComponent,
    EnderecoDetalheComponent
  ],
  exports: [
    EnderecoComponent,
    EnderecoDetalheComponent
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
    EnderecoRoutingModule
  ], providers:[
    EnderecoService
  ]
})
export class EnderecoModule { }
