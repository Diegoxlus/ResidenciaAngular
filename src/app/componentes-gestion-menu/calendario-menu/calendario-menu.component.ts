import {Component, OnInit} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullCalendar/core/locales/es'
import {Router} from '@angular/router';
import {MenuService} from '../../servicios/menu.service';
import {Menu} from '../../models/menu';


/**
 * Componente empleado para mostrar el calendario de las comidas/cenas.
 */

@Component({
  selector: 'app-calendario-menu',
  templateUrl: './calendario-menu.component.html',
  styleUrls: ['./calendario-menu.component.css'],
})
export class CalendarioMenuComponent implements OnInit{
  /**
   * Variable que contiene los plugins que añadimos al calendario.
   */
  calendarPlugins = [dayGridPlugin];
  /**
   * Variable empleada para indicar el idioma del calendario.
   */
  locales: [esLocale];
  /**
   * Array que contiene los menus que se van a mostrar en el calendario, es decir comidas y cenas.
   */
  arrayMenus: Array<Menu>;
  /**
   * Array de elementos que vamos a mostrar en el calendario, en concreto va a ser un array de menus.
   */
  eventos:Array<any>;

  /**
   * En el constructor inicializamos el arrayMenus, como un array de menus, al igual que eventos.
   * Tambien tenemos:
   * router: Para nevegar entre componentes.
   * menuService: Para poder obtener los menus de la API REST.
   * @param router
   * @param menuService
   */
  constructor(private router: Router,private menuService: MenuService) {
    this.arrayMenus = new Array<Menu>();
    this.eventos = new Array<any>();
  }

  /**
   * En el ngOnInit vamos a rellenar los arrays para mostrar en el calendario, y los añadimos al array de
   * eventos mediante la función añadirEventos().
   */
  ngOnInit(){
    this.menuService.getMenus().subscribe(
      menus=>{
        for(let menu of menus){
          this.arrayMenus.push(new Menu(menu.dia,menu.comida, menu.cena,menu.modificado));
        }
        this.añadirEventos();


      },error => {

      }
    )
  }

  /**
   * Añade los eventos para mostrarlos en el calendario, en color verde las comidas, y en amarillo las cenas.
   */
  añadirEventos(){
    for(let menu of this.arrayMenus){
      this.eventos.push({title:menu.comida,date:menu.dia,color:'green'});
      this.eventos.push({title:menu.cena,date:menu.dia,color:'yellow'});
    }
  }

  /**
   * Permite navegar al menú de la cocinera.
   */
  volver() {
    this.router.navigate(['menu-cocinera']);
  }

  /**
   * Permite navegar al componente para añadir una nueva comida.
   */
  nuevaComida() {
    this.router.navigate(['alta-menu']);
  }
}
