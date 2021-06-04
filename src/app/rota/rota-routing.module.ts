import {NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RotaDetalheComponent} from './rota-detalhe/rota-detalhe.component';
import {AuthGuard} from '../guards/auth.guard';
import { RotaComponent } from './rota/rota.component';


const rotaRoutes: Routes = [
  {path: 'rota', component: RotaComponent, canActivate: [AuthGuard]},
  {path: 'rota-detalhe', component: RotaDetalheComponent, canActivate: [AuthGuard]},
  {path: 'rota-detalhe/:id', component: RotaDetalheComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(rotaRoutes)],
  exports: [RouterModule]
})
export class RotaRoutingModule { }
