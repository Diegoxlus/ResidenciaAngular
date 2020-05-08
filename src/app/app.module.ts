import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes-iniciales/cabecera-component/cabecera-component';
import { PieComponentComponent } from './componentes-iniciales/pie/pie.component';
import { PaginaInicioComponent } from './componentes-iniciales/pagina-inicio/pagina-inicio-component';
import { HabitacionesComponent } from './componentes-gestion-habitaciones/habitaciones/habitaciones.component';
import { ResidentesComponent } from './componentes-gestion-usuarios/residentes/residentes.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { MaterialModule } from './material.module';
import { PersonalComponent } from './componentes-gestion-usuarios/personal/personal.component';
import { AltaPersonaComponent } from './componentes-gestion-usuarios/alta-persona/alta-persona.component';
import { MenuDirectoraComponent } from './menu-directora/menu-directora.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {pipeCargo} from './pippes/pipeCargo';
import {FiltroTabla} from './pippes/filtro';
import {CdkTableModule} from '@angular/cdk/table';
import {
  DateAdapter,
  MAT_DATE_LOCALE, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatButtonModule,
  MatCheckboxModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import {TrabajadoresComponent} from './componentes-gestion-usuarios/trabajadores/trabajadores.component';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResidenteEditComponent } from './componentes-gestion-usuarios/residente-edit/residente-edit.component';
import {DatosUsuarioService} from './servicios/datos-usuario.service';
import { TrabajadorEditComponent } from './componentes-gestion-usuarios/trabajador-edit/trabajador-edit.component';
import { AltaHabitacionComponent } from './componentes-gestion-habitaciones/alta-habitacion/alta-habitacion.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import { SelectResidentesComponent } from './componentes-gestion-habitaciones/select-residentes/select-residentes.component';
import { MenuCocineraComponent } from './menu-cocinera/menu-cocinera.component';
import { CalendarioMenuComponent } from './componentes-gestion-menu/calendario-menu/calendario-menu.component';
import { FullCalendarModule} from '@fullcalendar/angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AltaMenuComponent } from './componentes-gestion-menu/alta-menu/alta-menu.component';
import {MyDateAdapter} from '../assets/my-date-adapter';
import {DatePipe} from '@angular/common';
import { EditHabitacionComponent } from './componentes-gestion-habitaciones/edit-habitacion/edit-habitacion.component';
import { MenuResidenteComponent } from './menu-residente/menu-residente.component';
import { ListaAnotarseComidaComponent } from './componentes-gestion-menu/lista-anotarse-comida/lista-anotarse-comida.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { DialogoInformativoComponent } from './dialogo-informativo/dialogo-informativo.component';
import { AltaParteComponent } from './componentes-gestion-partes/alta-parte/alta-parte.component';
import { ListaPartesComponent } from './componentes-gestion-partes/lista-partes/lista-partes.component';
import { EditPartesComponent } from './componentes-gestion-partes/edit-partes/edit-partes.component';
import { ListaNoticiasComponent } from './componentes-gestion-noticias/lista-noticias/lista-noticias.component';
import { EditNoticiaComponent } from './componentes-gestion-noticias/edit-noticia/edit-noticia.component';
import { AltaNoticiaComponent } from './componentes-gestion-noticias/alta-noticia/alta-noticia.component';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { ListaNoticiasResidenteComponent } from './componentes-gestion-noticias/lista-noticias-residente/lista-noticias-residente.component';
import { AltaPagoComponent } from './componentes-gestion-pagos/alta-pago/alta-pago.component';
import {MonthPickerModel, MonthpickerComponent} from './monthpicker/monthpicker.component';
import { ListaPagosResidenteComponent } from './componentes-gestion-pagos/lista-pagos-residente/lista-pagos-residente.component';
import { ListaPagosComponent } from './componentes-gestion-pagos/lista-pagos/lista-pagos.component';
import { MenuSecretariaComponent } from './menu-secretaria/menu-secretaria.component';
import { ListaAsistenciaComidaComponent } from './componentes-gestion-menu/lista-asistencia-comida/lista-asistencia-comida.component';
import { AnotarseFindeComponent } from './anotarse-finde/anotarse-finde.component';
import { ListaPermanenciaFindeComponent } from './lista-permanencia-finde/lista-permanencia-finde.component';
import { ListaPermanenciaPropiaFindeComponent } from './lista-permanencia-propia-finde/lista-permanencia-propia-finde.component';
import { MenuPorteroComponent } from './menu-portero/menu-portero.component';
import {pipe} from 'rxjs';
import { HabitacionPipe } from './pippes/habitacion.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PieComponentComponent,
    PaginaInicioComponent,
    HabitacionesComponent,
    ResidentesComponent,
    PersonalComponent,
    AltaPersonaComponent,
    MenuDirectoraComponent,
    pipeCargo,
    FiltroTabla,
    TrabajadoresComponent,
    DialogoConfirmacionComponent,
    ResidenteEditComponent,
    TrabajadorEditComponent,
    AltaHabitacionComponent,
    SelectResidentesComponent,
    MenuCocineraComponent,
    CalendarioMenuComponent,
    AltaMenuComponent,
    EditHabitacionComponent,
    MenuResidenteComponent,
    ListaAnotarseComidaComponent,
    ConfiguracionComponent,
    DialogoInformativoComponent,
    AltaParteComponent,
    ListaPartesComponent,
    EditPartesComponent,
    ListaNoticiasComponent,
    EditNoticiaComponent,
    AltaNoticiaComponent,
    ListaNoticiasResidenteComponent,
    AltaPagoComponent,
    MonthpickerComponent,
    ListaPagosResidenteComponent,
    ListaPagosComponent,
    MenuSecretariaComponent,
    ListaAsistenciaComidaComponent,
    AnotarseFindeComponent,
    ListaPermanenciaFindeComponent,
    ListaPermanenciaPropiaFindeComponent,
    MenuPorteroComponent,
    HabitacionPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    FontAwesomeModule,
    CdkTableModule,
    MatTableModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxMatSelectSearchModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    FullCalendarModule,
    NgxMaterialTimepickerModule.setLocale('es-ES'),
    NgbModule,
    MatPaginatorModule,
    MatButtonModule,
    
  ],
  exports: [
    FiltroTabla,
    pipeCargo,
    HabitacionPipe
  ],
  providers: [HabitacionPipe,pipeCargo,{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }, DatosUsuarioService,{provide: MAT_DATE_LOCALE , useValue: 'es-ES'},{provide: DateAdapter, useClass: MyDateAdapter},DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ListaNoticiasComponent,DialogoConfirmacionComponent,DialogoInformativoComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
