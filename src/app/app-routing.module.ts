import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PaginaInicioComponent} from './pagina-inicio/pagina-inicio-component';
import {HabitacionesComponent} from './habitaciones/habitaciones.component';
import {ResidentesComponent} from './residentes/residentes.component';
import {PersonalComponent} from './personal/personal.component';
import {PagosComponent} from './pagos/pagos.component';
import {MenuDirectoraComponent} from './menu-directora/menu-directora.component';
import {AltaPersonaComponent} from './alta-persona/alta-persona.component';


const routes: Routes = [
  {path: '', component: PaginaInicioComponent},
  {path: 'personal', component: PersonalComponent},
  {path: 'residentes', component: ResidentesComponent},
  {path: 'habitaciones', component: HabitacionesComponent},
  {path: 'pagos', component: PagosComponent},
  {path: 'menu-directora', component: MenuDirectoraComponent},
  {path: 'alta-personal', component: AltaPersonaComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
