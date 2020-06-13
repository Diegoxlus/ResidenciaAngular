import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MenuService} from '../../servicios/menu.service';
import {Menu} from '../../models/menu';
import {Router} from '@angular/router';

/**
 * Componente empleado para dar de Alta un nuevo menú.
 */

@Component({
  selector: 'app-alta-menu',
  templateUrl: './alta-menu.component.html',
  styleUrls: ['./alta-menu.component.css']
})
export class AltaMenuComponent{
  /**
   * Variable empleada para saber si existe ya una comida o cena el dia seleccionado.
   */
  existeComida: boolean;
  /**
   * Contiene el valor de la nueva comida
   */
  comidaSelecionada: String;
  /**
   * Contiene el valor de la nueva cena
   */
  cenaSelecionada: String;
  /**
   * Instancia de la clase Menu empleada para almacenar el nuevo menu.
   */
  nuevoMenu: Menu;

  /**
   * Variable booleana, en caso de que se registre la correctamente se establece a true.
   */
  registroCorrecto: boolean = false;
  /**
   * Variable booleana, en caso de que se no se registre correctamente se establece a true.
   */
  registroIncorrecto: boolean = false;
  /**
   * Variable que contiene el mensaje de error que viene de la API REST.
   */
  msgError:String;

  /**
   * Instancia de FormGroup que contiene las validaciones y datos de los campos del formulario.
   */
  public FormularioAltaMenu = new FormGroup({
    comida: new FormControl('', [
      Validators.pattern("^[a-zA-Z0-9 ñÑ\\-_]*$"
      )]),
    cena: new FormControl('', [
      Validators.pattern("^[a-zA-Z0-9 ñÑ\\-_]*$")]),
    fecha: new FormControl('', [
      Validators.required,
    ])
  });

  /**
   * Contiene el valor de la fecha seleccionada.
   */
  public sfecha:string;

  /**
   * Constructor del componente, sus parametros son:
   * menuService: Servicio para poder dar de alta un nuevo menú.
   * datepipe: Para poder transformar la fecha.
   * router: Para poder navegar entre componentes.
   * @param menuService
   * @param datepipe
   * @param router
   */
  constructor(private menuService: MenuService, public datepipe: DatePipe,private router: Router) {
    this.existeComida = false;
    this.nuevoMenu = new Menu();

  }

  /**
   * Permite obtener la comida del formulario.
   */
  get comida(){
    return this.FormularioAltaMenu.get('comida');
  }
  /**
   * Permite obtener la cena del formulario.
   */
  get cena(){
    return this.FormularioAltaMenu.get('cena');
  }
  /**
   * Permite obtener la fecha del datepicker del formulario.
   */
  get fecha(){
    return this.FormularioAltaMenu.get('fecha');
  }

  /**
   * Filtro empleado para mostrar unicamente de Lunes a Viernes en el datepicker.
   * @param d
   */
  filtro = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };


  /**
   * Comprueba si existen comidas para el dia seleccionado, transforma la fecha seleccionada y envia una
   * petición a la API REST, en caso de que si que haya, muestra un div con la comida y cena para ese día.
   */
  comprobarComidas() {
    let fechaSelecionada = new Date(this.fecha.value);
    this.sfecha = this.datepipe.transform(fechaSelecionada,'yyyy-MM-dd').toString();

    this.menuService.getMenuDia(this.sfecha).subscribe(
      menu=>{
        this.existeComida = menu != false;
        this.comidaSelecionada = menu.comida;
        this.cenaSelecionada = menu.cena;
        this.resetearIntento();

      },error => {
        this.msgError= error;
        console.log(error);
      }
    )
  }

  /**
   * Primeramente establecemos los valores del menu gracias a los valores del formulario, después se envia
   * el menu a la API REST para añadirlo al sistema. Si muestra un mensaje dependiendo de si se añade
   * correctamente o no.
   */
  altaMenu() {
    this.nuevoMenu.comida = this.comida.value;
    this.nuevoMenu.cena = this.cena.value;
    this.nuevoMenu.dia = this.sfecha;

    this.menuService.añadirMenu(this.nuevoMenu).subscribe(
      result=>{
        this.registroCorrecto=true;
        this.existeComida=false;
      console.log(result);
      },error=>{
        this.msgError = error.error;
      }
    )
  }

  /**
   * Se resetean los valores del registro.
   */
  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  /**
   * Se vuelve al menu principal de la cocinera.
   */
  volver() {
    this.router.navigate(['menu-cocinera']);
  }
}
