import {NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TelefoneDetalheComponent} from './telefone-detalhe/telefone-detalhe.component';
import {AuthGuard} from '../guards/auth.guard';
import { TelefoneComponent } from './telefone/telefone.component';


const telefoneRoutes: Routes = [
  {path: 'telefone', component: TelefoneComponent, canActivate: [AuthGuard]},
  {path: 'telefone-detalhe', component: TelefoneDetalheComponent, canActivate: [AuthGuard]},
  {path: 'telefone-detalhe/:id', component: TelefoneDetalheComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(telefoneRoutes)],
  exports: [RouterModule]
})
export class TelefoneRoutingModule { }
