import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera-component/cabecera-component';
import { PieComponentComponent } from './pie/pie.component';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio-component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { ResidentesComponent } from './residentes/residentes.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { MaterialModule } from './material.module';
import { PersonalComponent } from './personal/personal.component';
import { PagosComponent } from './pagos/pagos.component';
import { AltaPersonaComponent } from './alta-persona/alta-persona.component';
import { MenuDirectoraComponent } from './menu-directora/menu-directora.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {pipeCargo} from './pippes/pipeCargo';
import {FiltroTabla} from './pippes/filtro';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule} from '@angular/material';
import {TrabajadoresComponent} from './trabajadores/trabajadores.component';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResidenteEditComponent } from './residente-edit/residente-edit.component';
import {DatosUsuarioService} from './servicios/datos-usuario.service';


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
    BrowserAnimationsModule
  ],
  exports: [
    FiltroTabla
  ],
  providers: [DatosUsuarioService],
  bootstrap: [AppComponent],
  entryComponents: [DialogoConfirmacionComponent]
})
export class AppModule { }
