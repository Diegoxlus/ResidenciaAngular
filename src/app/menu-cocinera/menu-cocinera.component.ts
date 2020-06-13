import { Component} from '@angular/core';
import {faBookOpen, faCalendarPlus} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';

/**
 * Componente que controla el menu de la cocinera.
 */

@Component({
  selector: 'app-menu-cocinera',
  templateUrl: './menu-cocinera.component.html',
  styleUrls: ['./menu-cocinera.component.css']
})
export class MenuCocineraComponent{
  /**
   * Icono del calendario.
   */
  iconoComida = faCalendarPlus;
  /**
   * Icono para gestionar comidas.
   */
  iconoAnotar = faBookOpen;
  /**
   * Icono para gestionar la asistencia.
   */
  iconoInscribir= faEdit;

  /**
   * Constructor del menu, contiene el router que nos permite navegar a otros componentes.
   * @param router
   */
  constructor( private router: Router) {
  }

  /**
   * Navega al componente de gestión de comidas.
   */
  irGestionComidas() {
    this.router.navigate(['alta-menu']);
  }

  /**
   * Navega al componente para ver el calendario de comidas y cenas.
   */
  irVerComidas() {
    this.router.navigate(['menu-mensual']);
  }

  /**
   * Navega al componente para gestionar la asistencia a comidas y cenas.
   */
  irGestionAsistencia() {
    this.router.navigate(['lista-asistencia']);

  }
}
