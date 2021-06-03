import {NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MotoristaComponent} from './motorista/motorista.component';
import {MotoristaDetalheComponent} from './motorista-detalhe/motorista-detalhe.component';
import {AuthGuard} from '../guards/auth.guard';

const motoristaRoutes: Routes = [
  {path: 'motorista', component: MotoristaComponent, canActivate: [AuthGuard]},
  {path: 'motorista-detalhe', component: MotoristaDetalheComponent, canActivate: [AuthGuard]},
  {path: 'motorista-detalhe/:id', component: MotoristaDetalheComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(motoristaRoutes)],
  exports: [RouterModule]
})
export class MotoristaRoutingModule { }
