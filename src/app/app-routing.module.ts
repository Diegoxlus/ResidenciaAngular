import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaginaInicioComponent} from './componentes-iniciales/pagina-inicio/pagina-inicio-component';
import {HabitacionesComponent} from './componentes-gestion-habitaciones/habitaciones/habitaciones.component';
import {ResidentesComponent} from './componentes-gestion-usuarios/residentes/residentes.component';
import {PersonalComponent} from './componentes-gestion-usuarios/personal/personal.component';
import {MenuDirectoraComponent} from './menu-directora/menu-directora.component';
import {AltaPersonaComponent} from './componentes-gestion-usuarios/alta-persona/alta-persona.component';
import {ResidenteEditComponent} from './componentes-gestion-usuarios/residente-edit/residente-edit.component';
import {TrabajadorEditComponent} from './componentes-gestion-usuarios/trabajador-edit/trabajador-edit.component';
import {SelectResidentesComponent} from './componentes-gestion-habitaciones/select-residentes/select-residentes.component';
import {AltaHabitacionComponent} from './componentes-gestion-habitaciones/alta-habitacion/alta-habitacion.component';
import {MenuCocineraComponent} from './menu-cocinera/menu-cocinera.component';
import {CalendarioMenuComponent} from './componentes-gestion-menu/calendario-menu/calendario-menu.component';
import {AltaMenuComponent} from './componentes-gestion-menu/alta-menu/alta-menu.component';
import {EditHabitacionComponent} from './componentes-gestion-habitaciones/edit-habitacion/edit-habitacion.component';
import {MenuResidenteComponent} from './menu-residente/menu-residente.component';
import {ListaAnotarseComidaComponent} from './componentes-gestion-menu/lista-anotarse-comida/lista-anotarse-comida.component';
import {ConfiguracionComponent} from './configuracion/configuracion.component';
import {ListaPartesComponent} from './componentes-gestion-partes/lista-partes/lista-partes.component';
import {AltaParteComponent} from './componentes-gestion-partes/alta-parte/alta-parte.component';
import {EditPartesComponent} from './componentes-gestion-partes/edit-partes/edit-partes.component';
import {AltaNoticiaComponent} from './componentes-gestion-noticias/alta-noticia/alta-noticia.component';
import {EditNoticiaComponent} from './componentes-gestion-noticias/edit-noticia/edit-noticia.component';
import {ListaNoticiasComponent} from './componentes-gestion-noticias/lista-noticias/lista-noticias.component';
import {ListaNoticiasResidenteComponent} from './componentes-gestion-noticias/lista-noticias-residente/lista-noticias-residente.component';
import {AltaPagoComponent} from './componentes-gestion-pagos/alta-pago/alta-pago.component';
import {ListaPagosResidenteComponent} from './componentes-gestion-pagos/lista-pagos-residente/lista-pagos-residente.component';
import {ListaPagosComponent} from './componentes-gestion-pagos/lista-pagos/lista-pagos.component';
import {ListaAsistenciaComidaComponent} from './componentes-gestion-menu/lista-asistencia-comida/lista-asistencia-comida.component';
import {MenuSecretariaComponent} from './menu-secretaria/menu-secretaria.component';

const routes: Routes = [
  {path: '', component: PaginaInicioComponent},
  {path: 'alta-pago', component: AltaPagoComponent},
  {path: 'alta-noticias', component: AltaNoticiaComponent},
  {path: 'personal', component: PersonalComponent},
  {path: 'residentes', component: ResidentesComponent},
  {path: 'habitaciones', component: HabitacionesComponent},
  {path: 'menu-directora', component: MenuDirectoraComponent},
  {path: 'alta-personal', component: AltaPersonaComponent},
  {path: 'modificar-residente', component: ResidenteEditComponent},
  {path: 'modificar-trabajador',component:TrabajadorEditComponent},
  {path: 'select-residente',component:SelectResidentesComponent},
  {path: 'alta-habitacion', component:AltaHabitacionComponent},
  {path: 'menu-cocinera', component: MenuCocineraComponent},
  {path: 'menu-mensual', component: CalendarioMenuComponent},
  {path: 'alta-menu', component: AltaMenuComponent},
  {path: 'modificar-habitacion', component: EditHabitacionComponent},
  {path: 'menu-residente', component: MenuResidenteComponent},
  {path: 'lista-anotarse-comida', component: ListaAnotarseComidaComponent},
  {path: 'configuracion', component: ConfiguracionComponent},
  {path: 'lista-partes', component: ListaPartesComponent},
  {path: 'alta-parte', component: AltaParteComponent},
  {path: 'editar-parte', component: EditPartesComponent},
  {path: 'alta-noticia', component: AltaNoticiaComponent},
  {path: 'editar-noticia', component: EditNoticiaComponent},
  {path: 'gestion-noticias', component: ListaNoticiasComponent},
  {path: 'lista-noticias', component: ListaNoticiasResidenteComponent},
  {path: 'mis-pagos', component: ListaPagosResidenteComponent},
  {path: 'lista-pagos', component: ListaPagosComponent},
  {path: 'lista-asistencia' ,component: ListaAsistenciaComidaComponent},
  {path: 'menu-secretaria', component: MenuSecretariaComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
