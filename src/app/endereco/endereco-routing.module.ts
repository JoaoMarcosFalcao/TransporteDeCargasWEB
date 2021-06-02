import {NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnderecoComponent} from './endereco/endereco.component';
import {EnderecoDetalheComponent} from './endereco-detalhe/endereco-detalhe.component';
import {AuthGuard} from '../guards/auth.guard';

const enderecoRoutes: Routes = [
  {path: 'endereco', component: EnderecoComponent, canActivate: [AuthGuard]},
  {path: 'endereco-detalhe', component: EnderecoDetalheComponent, canActivate: [AuthGuard]},
  {path: 'endereco-detalhe/:id', component: EnderecoDetalheComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(enderecoRoutes)],
  exports: [RouterModule]
})
export class EnderecoRoutingModule { }
