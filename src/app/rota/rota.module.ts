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
import {RotaRoutingModule} from './rota-routing.module';
import {RotaService} from './rota.service';
import {RotaDetalheComponent} from './rota-detalhe/rota-detalhe.component';
import { RotaComponent } from './rota/rota.component';



@NgModule({
  declarations: [
    RotaComponent,
    RotaDetalheComponent
  ],
  exports: [
    RotaComponent,
    RotaDetalheComponent
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
    RotaRoutingModule
  ], providers:[
    RotaService
  ]
})
export class RotaModule { }
