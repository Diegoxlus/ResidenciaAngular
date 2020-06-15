import { Component, OnInit } from '@angular/core';
import {faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {faBed} from '@fortawesome/free-solid-svg-icons';
import {faCogs} from '@fortawesome/free-solid-svg-icons';
import {faUserTimes} from '@fortawesome/free-solid-svg-icons';
import {faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons/faMoneyCheckAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons/faCalendarCheck';

/**
 * Componente que controla el menú de la directora.
 */

@Component({
  selector: 'app-menu-directora',
  templateUrl: './menu-directora.component.html',
  styleUrls: ['./menu-directora.component.css']
})
export class MenuDirectoraComponent {
  /**
   * Icono de usuarios.
   */
  iconoUsuarios = faUserFriends;
  /**
   * Icono de habitación.
   */
  iconoHabitacion = faBed;
  /**
   * Icono parte.
   */
  iconoParte = faUserTimes;
  /**
   * Icono noticia.
   */
  iconoNoticia = faNewspaper;
  /**
   * Icono de configuración.
   */
  iconoConfiguracion = faCogs;
  /**
   * Icono de pagos.
   */
  iconoPagos = faMoneyCheckAlt;
  /**
   * Icono de  inscripción.
   */
  iconoInscribir = faEdit;
  /**
   * Icono de permanencia fin de semana.
   */
  iconoFinde = faCalendarCheck;

  /**
   * Constructor del componente, el router permite navegar a otros componentes.
   * @param router
   */
  constructor( private router: Router) {
  }

  /**
   * Navega al componente que gestiona al personal.
   */
  irGestionPersonal() {
    this.router.navigate(['/personal']);
  }
  /**
   * Navega al componente que gestiona las habitaciones.
   */
  irGestionHabitaciones() {
    ("Redirect correcto");
    this.router.navigate(['/habitaciones']);
  }
  /**
   * Navega al componente que gestiona los partes.
   */
  irGestionPartes() {
    this.router.navigate(['/lista-partes']);
  }
  /**
   * Navega al componente que gestiona las noticias.
   */
  irGestionNoticias() {
    this.router.navigate(['/gestion-noticias']);
  }
  /**
   * Navega al componente de configuración.
   */
  irConfiguracion() {
    this.router.navigate(['/configuracion']);
  }

  /**
   * Navega al componente que gestiona los pagos.
   */
  irGestionPagos() {
    this.router.navigate(['/lista-pagos']);

  }

  /**
   * Navega al componente que gestiona las asistencias.
   */
  irGestionAsistencia() {
    this.router.navigate(['/lista-asistencia']);

  }

  /**
   * Navega al componente que gestiona las permanencias los fines de semanas.
   */
  irVerFinde() {
    this.router.navigate(['/lista-permanencia']);
  }
}
