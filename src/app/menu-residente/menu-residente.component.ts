import { Component, OnInit } from '@angular/core';
import {faUtensilSpoon, faBookOpen, faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons/faMoneyCheckAlt';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons/faCalendarCheck';

/**
 * Componente que gestiona el menú del residente.
 */

@Component({
  selector: 'app-menu-residente',
  templateUrl: './menu-residente.component.html',
  styleUrls: ['./menu-residente.component.css']
})
export class MenuResidenteComponent{
  /**
   * Icono para la comida.
   */
  iconoComida = faUtensilSpoon;
  /**
   * Icono para anotar.
   */
  iconoAnotar = faBookOpen;
  /**
   * Icono para las noticia.
   */
  iconoNoticia = faNewspaper;
  /**
   * Icono para los pagos.
   */
  iconoPago  = faMoneyCheckAlt;
  /**
   * Icono para el fin de semana.
   */
  iconoFinde = faCalendarCheck;

  /**
   * Constructor del componente, el router permite navegar entre componentes.
   * @param router
   */
  constructor( private router: Router) {
  }

  /**
   * Navegaga al componente que muestra el calendario de comidas y cenas.
   */
  irVerComidas() {
    this.router.navigate(['menu-mensual']);
  }

  /**
   * Navega al componente que muestra la lista de comidas y cenas para poder anotarse-
   */

  irAnotarseComidas() {
    this.router.navigate(['lista-anotarse-comida']);
  }

  /**
   * Navega al componente que muestra las noticias.
   */
  irVerNoticias() {
    this.router.navigate(['lista-noticias']);

  }

  /**
   * Navega al componente que permite gestionar los pagos del residente.
   */

  irGestionPagosResidente() {
    this.router.navigate(['mis-pagos']);

  }

  /**
   * Navega al componente que permite gestionar la permanencia del propio residente.
   */
  irVerPermanencia() {
    this.router.navigate(['mi-permanencia']);

  }
}
