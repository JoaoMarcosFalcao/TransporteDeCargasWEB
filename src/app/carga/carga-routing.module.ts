import {NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CargaDetalheComponent} from './carga-detalhe/carga-detalhe.component';
import {AuthGuard} from '../guards/auth.guard';
import { CargaComponent } from './carga/carga/carga.component';

const cargaRoutes: Routes = [
  {path: 'carga', component: CargaComponent, canActivate: [AuthGuard]},
  {path: 'carga-detalhe', component: CargaDetalheComponent, canActivate: [AuthGuard]},
  {path: 'carga-detalhe/:id', component: CargaDetalheComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(cargaRoutes)],
  exports: [RouterModule]
})
export class CargaRoutingModule { }
