import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {ClienteModule} from './cliente/cliente.module';
import {EnderecoModule} from './endereco/endereco.module';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {ClienteRoutingModule} from './cliente/cliente-routing.module';
import {EnderecoRoutingModule} from './endereco/endereco-routing.module';
import {MatCardModule} from '@angular/material/card';
import {LoginModule} from './login/login.module';
import { CargaModule } from './carga/carga.module';
import { CargaRoutingModule } from './carga/carga-routing.module';
import { MotoristaRoutingModule } from './motorista/motorista-routing.module';
import { MotoristaModule } from './motorista/motorista.module';
import { TelefoneRoutingModule } from './telefone/telefone-routing.module';
import { TelefoneModule } from './telefone/telefone.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { VeiculoRoutingModule } from './veiculo/veiculo-routing.module';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ClienteModule,
    MotoristaModule,
    EnderecoModule,
    CargaModule,
    VeiculoModule,
    TelefoneModule,
    HttpClientModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    ClienteRoutingModule,
    EnderecoRoutingModule,
    MotoristaRoutingModule,
    CargaRoutingModule,
    TelefoneRoutingModule,
    VeiculoRoutingModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
