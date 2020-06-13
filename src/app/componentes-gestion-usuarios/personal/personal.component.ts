import { Component} from '@angular/core';
import {Router} from '@angular/router';


/**
 * Este componente se encarga de mostrar el componente que lista residentes o el que lista trabajadores.
 */

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent{

  /**
   * Variable booleana, si vista es igual a true, se muestra el componente de los residentes.
   * Si vista es igual a false, se muestra el componente de los trabajadaores.
   */
  vista: boolean; //Vista a true para los residentes

  /**
   * Constructor del componente, se instancia:
   * vista se inicializa a true, por lo tanto se va a mostrar siempre el componente de residentes.
   * @param router
   */
  constructor(public router: Router) {
    this.vista=true;
  }

}
