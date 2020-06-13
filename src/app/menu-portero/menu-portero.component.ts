import { Component} from '@angular/core';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons/faCalendarCheck';
import {Router} from '@angular/router';

/**
 * Componente que gestiona el menú del portero.
 */

@Component({
  selector: 'app-menu-portero',
  templateUrl: './menu-portero.component.html',
  styleUrls: ['./menu-portero.component.css']
})
export class MenuPorteroComponent{

  /**
   * Icono para la gestion de permanencia.
   */
  iconoFinde = faCalendarCheck;

  /**
   * Constructor del componente, el router permite navegar a otro componente.
   * @param router
   */
  constructor(private router: Router) {}

  /**
   * Navega al componente que gestiona la lista de permanencia.
   */
    irVerPermanencia(){
      this.router.navigate(['lista-permanencia']);
    }

}
