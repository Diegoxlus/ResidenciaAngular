import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera-component/cabecera-component';
import { PieComponentComponent } from './pie/pie.component';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio-component';
import { HabitacionesComponent } from './componentes-gestion-habitaciones/habitaciones/habitaciones.component';
import { ResidentesComponent } from './componentes-gestion-usuarios/residentes/residentes.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { MaterialModule } from './material.module';
import { PersonalComponent } from './componentes-gestion-usuarios/personal/personal.component';
import { PagosComponent } from './pagos/pagos.component';
import { AltaPersonaComponent } from './componentes-gestion-usuarios/alta-persona/alta-persona.component';
import { MenuDirectoraComponent } from './menu-directora/menu-directora.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {pipeCargo} from './pippes/pipeCargo';
import {FiltroTabla} from './pippes/filtro';
import {CdkTableModule} from '@angular/cdk/table';
import {DateAdapter, MAT_DATE_LOCALE, MatCheckboxModule, MatOptionModule, MatSelectModule, MatTableModule} from '@angular/material';
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
import { ModalComidaComponent } from './modal-comida/modal-comida.component';
import { AltaMenuComponent } from './componentes-gestion-menu/alta-menu/alta-menu.component';
import {MyDateAdapter} from '../assets/my-date-adapter';
import {DatePipe} from '@angular/common';
import { EditHabitacionComponent } from './componentes-gestion-habitaciones/edit-habitacion/edit-habitacion.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PieComponentComponent,
    PaginaInicioComponent,
    HabitacionesComponent,
    ResidentesComponent,
    PersonalComponent,
    PagosComponent,
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
    ModalComidaComponent,
    AltaMenuComponent,
    EditHabitacionComponent,

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
    NgbModule
  ],
  exports: [
    FiltroTabla
  ],
  providers: [DatosUsuarioService,{provide: MAT_DATE_LOCALE , useValue: 'es-ES'},{provide: DateAdapter, useClass: MyDateAdapter},DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [DialogoConfirmacionComponent]
})
export class AppModule { }
