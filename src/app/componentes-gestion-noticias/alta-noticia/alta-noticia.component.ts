import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NoticiaService} from '../../servicios/noticia.service';
import {Noticia} from '../../models/noticia';

/**
 * Componente empleado para dar de alta una nueva noticia.
 */
@Component({
  selector: 'app-alta-noticia',
  templateUrl: './alta-noticia.component.html',
  styleUrls: ['./alta-noticia.component.css']
})
export class AltaNoticiaComponent{
  /**
   * Noticia que vamos a dar de alta, una instancia de la clase Noticia.
   */
  noticia: Noticia;
  /**
   * Variable empleada para mostrar el mensaje de registro correcto, en ese caso se establece a true;
   */
  registroCorrecto : boolean = false;
  /**
   * Variable empleada para mostrar el mensaje de registro incorrecto, en ese caso se establece a true;
   */
  registroIncorrecto : boolean = false;
  /**
   * Variable empleada para mostrar el mensaje de error obtenido de la API REST.
   */
  msgError: string;

  /**
   * FormGroup empleado para validar y obtener los campos del formulario.
   */
  public FormularioAlta = new FormGroup({
    titulo: new FormControl('', [
      Validators.required,
    ]),
    descripcion: new FormControl('', [
      Validators.required ]),

  });

  /**
   * Constructor del componente, contiene:
   * router: Para nevegar entre componentes.
   * noticiaService: Para realizar el alta de la noticia con la API REST.
   * @param router
   * @param noticiaService
   */
  constructor(public router: Router,private noticiaService : NoticiaService){
    this.noticia = new Noticia();
  }

  /**
   * Permite dar de alta una noticia, primeramente se pasan los valores del formulario a la noticia.
   * Después se validan los campos y en caso de que sean correctos se registra la noticia.
   * En caso incorrecto se muestra el mensaje de error.
   *
   */
  altaNoticia() {
    this.pasarValoresNoticia();
    if (this.noticia.titulo == undefined || this.noticia.descripcion == undefined) {
      this.registroIncorrecto = true;
    } else {
      this.resetearIntento();
      this.noticiaService.registrarNoticia(this.noticia).subscribe(data => {
          this.registroCorrecto = true;
          this.FormularioAlta.reset();
          this.titulo.setErrors(null);
          this.descripcion.setErrors(null);

        }, error => {
          this.registroIncorrecto = true;
          this.msgError = error.error;

        }
      );
    }
  }

  /**
   * Get empleado para obtener el titulo del formulario.
   */
  get titulo(){
    return this.FormularioAlta.get('titulo');
  }
  /**
   * Get empleado para obtener la descripción del formulario.
   */
  get descripcion(){
    return this.FormularioAlta.get('descripcion');
  }

  /**
   * Metodo empleado para pasar los valores del formulario a nuestra instancia de la clase Noticia.
   * En caso de que no sean validos se cambia el mensaje de error.
   */
  private pasarValoresNoticia() {

    if(!this.titulo.value||  !this.descripcion.value){
      this.msgError = "Rellena todos los campos del formulario";
    }
    else{
      this.noticia.titulo = this.titulo.value;
      this.noticia.descripcion = this.descripcion.value;
    }



  }

  /**
   * Permite resetear el valor de los registros, con el fin de no mostrar los mensajes.
   */
  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }


}
