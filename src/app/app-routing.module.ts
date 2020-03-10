import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaginaInicioComponent} from './pagina-inicio/pagina-inicio-component';
import {HabitacionesComponent} from './componentes-gestion-habitaciones/habitaciones/habitaciones.component';
import {ResidentesComponent} from './componentes-gestion-usuarios/residentes/residentes.component';
import {PersonalComponent} from './componentes-gestion-usuarios/personal/personal.component';
import {PagosComponent} from './pagos/pagos.component';
import {MenuDirectoraComponent} from './menu-directora/menu-directora.component';
import {AltaPersonaComponent} from './componentes-gestion-usuarios/alta-persona/alta-persona.component';
import {ResidenteEditComponent} from './componentes-gestion-usuarios/residente-edit/residente-edit.component';
import {TrabajadorEditComponent} from './componentes-gestion-usuarios/trabajador-edit/trabajador-edit.component';
import {SelectResidentesComponent} from './componentes-gestion-habitaciones/select-residentes/select-residentes.component';
import {AltaHabitacionComponent} from './componentes-gestion-habitaciones/alta-habitacion/alta-habitacion.component';


const routes: Routes = [
  {path: '', component: PaginaInicioComponent},
  {path: 'personal', component: PersonalComponent},
  {path: 'residentes', component: ResidentesComponent},
  {path: 'habitaciones', component: HabitacionesComponent},
  {path: 'pagos', component: PagosComponent},
  {path: 'menu-directora', component: MenuDirectoraComponent},
  {path: 'alta-personal', component: AltaPersonaComponent},
  {path: 'modificar-residente', component: ResidenteEditComponent},
  {path: 'modificar-trabajador',component:TrabajadorEditComponent},
  {path: 'select-residente',component:SelectResidentesComponent},
  {path: 'alta-habitacion', component:AltaHabitacionComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
