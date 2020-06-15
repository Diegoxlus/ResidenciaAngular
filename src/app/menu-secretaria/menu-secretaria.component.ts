import { Component, OnInit } from '@angular/core';
import {faBed, faCogs, faNewspaper, faUserFriends, faUserTimes} from '@fortawesome/free-solid-svg-icons';
import {faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons/faMoneyCheckAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {Router} from '@angular/router';

/**
 * Componente que permite gestionar el menú de la secretaria.
 */

@Component({
  selector: 'app-menu-secretaria',
  templateUrl: './menu-secretaria.component.html',
  styleUrls: ['./menu-secretaria.component.css']
})
export class MenuSecretariaComponent{
  /**
   * Icono de usuario
   */
  iconoUsuarios = faUserFriends;
  /**
   * Icono de habitación.
   */
  iconoHabitacion = faBed;
  /**
   * Icono de parte.
   */
  iconoParte = faUserTimes;
  /**
   * Icono de noticia.
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
   * Icono de inscribirse.
   */
  iconoInscribir = faEdit;


  /**
   * Constructor del componente, el router permite navegar entre componentes.
   * @param router
   */
  constructor( private router: Router) {
  }

  /**
   * Permite navegar al componente que gestiona al personal.
   */
  irGestionPersonal() {
    this.router.navigate(['/personal']);
  }
  /**
   * Permite navegar al componente que gestiona las habitaciones.
   */
  irGestionHabitaciones() {

    this.router.navigate(['/habitaciones']);
  }

  /**
   * Permite navegar al componente que gestiona los partes.
   */
  irGestionPartes() {
    this.router.navigate(['/lista-partes']);
  }

  /**
   * Permite navegar al componente que gestiona las noticias.
   */
  irGestionNoticias() {
    this.router.navigate(['/gestion-noticias']);
  }

  /**
   * Permite navegar al componente que gestiona la configuración.
   */
  irConfiguracion() {
    this.router.navigate(['/configuracion']);
  }
  /**
   * Permite navegar al componente que gestiona los pagos.
   */
  irGestionPagos() {
    this.router.navigate(['/lista-pagos']);

  }
  /**
   * Permite navegar al componente que gestiona la asistencia.
   */
  irGestionAsistencia() {
    this.router.navigate(['/lista-asistencia']);

  }
}
