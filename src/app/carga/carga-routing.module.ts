import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CargaComponent} from './carga/carga.component';
import {CargaDetalheComponent} from './carga-detalhe/carga-detalhe.component';
import {AuthGuard} from '../guards/auth.guard';

const cargaRoutes: Routes = [
  {path: 'cliente', component: CargaComponent, canActivate: [AuthGuard]},
  {path: 'cliente-detalhe', component: CargaDetalheComponent, canActivate: [AuthGuard]},
  {path: 'cliente-detalhe/:id', component: CargaDetalheComponent, canActivate: [AuthGuard]}
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargaRoutingModule { }
