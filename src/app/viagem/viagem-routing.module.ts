import {NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViagemDetalheComponent} from './viagem-detalhe/viagem-detalhe.component';
import {AuthGuard} from '../guards/auth.guard';
import { ViagemComponent } from './viagem/viagem.component';


const viagemRoutes: Routes = [
  {path: 'viagem', component: ViagemComponent, canActivate: [AuthGuard]},
  {path: 'viagem-detalhe', component: ViagemDetalheComponent, canActivate: [AuthGuard]},
  {path: 'viagem-detalhe/:id', component: ViagemDetalheComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(viagemRoutes)],
  exports: [RouterModule]
})
export class ViagemRoutingModule { }
