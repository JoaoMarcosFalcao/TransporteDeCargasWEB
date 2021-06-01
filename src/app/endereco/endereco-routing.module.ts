import {NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnderecoComponent} from './endereco/endereco.component';
import {EnderecoDetalheComponent} from './endereco-detalhe/endereco-detalhe.component';
import {AuthGuard} from '../guards/auth.guard';

const clienteRoutes: Routes = [
  {path: 'endereco', component: EnderecoComponent, canActivate: [AuthGuard]},
  {path: 'endereco-detalhe', component: EnderecoDetalheComponent, canActivate: [AuthGuard]},
  {path: 'endereco-detalhe/:id', component: EnderecoDetalheComponent, canActivate: [AuthGuard]}
];

@NgModule({
  exports: [RouterModule]
})
export class EnderecoRoutingModule { }
