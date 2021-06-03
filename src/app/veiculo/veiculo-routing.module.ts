import {NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VeiculoDetalheComponent} from './veiculo-detalhe/veiculo-detalhe.component';
import {AuthGuard} from '../guards/auth.guard';
import { VeiculoComponent } from './veiculo/veiculo.component';


const veiculoRoutes: Routes = [
  {path: 'veiculo', component: VeiculoComponent, canActivate: [AuthGuard]},
  {path: 'veiculo-detalhe', component: VeiculoDetalheComponent, canActivate: [AuthGuard]},
  {path: 'veiculo-detalhe/:id', component: VeiculoDetalheComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(veiculoRoutes)],
  exports: [RouterModule]
})
export class VeiculoRoutingModule { }
