import { Component, OnInit } from '@angular/core';
import {Noticia} from '../../models/noticia';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NoticiaService} from '../../servicios/noticia.service';
import {DatosNoticiaService} from '../../servicios/datos-noticia.service';

/**
 * Componente empleado para editar una noticia.
 */
@Component({
  selector: 'app-edit-noticia',
  templateUrl: './edit-noticia.component.html',
  styleUrls: ['./edit-noticia.component.css']
})
export class EditNoticiaComponent implements OnInit {
  /**
   * Noticia que se va a editar.
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
   * noticiaService: Para realizar la modificación de la noticia con la API REST.
   * datosNoticiaService: Servicio empleado para pasar la noticia entre los componentes.
   * @param router
   * @param noticiaService
   * @param datosNoticiaService
   */
  constructor(public router: Router,private noticiaService : NoticiaService, private datosNoticiaService: DatosNoticiaService){
    this.noticia = new Noticia();
  }

  /**
   * Permite editar una noticia, primeramente se pasan los valores del formulario a la noticia.
   * Después se validan los campos y en caso de que sean correctos se registra la noticia.
   * En caso incorrecto se muestra el mensaje de error.
   *
   */
  editarNoticia() {
    this.pasarValoresNoticia();
    if (this.noticia.titulo == undefined || this.noticia.descripcion == undefined) {
      this.registroIncorrecto = true;
    } else {
      this.resetearIntento();
      this.noticiaService.editarNoticia(this.noticia).subscribe(data => {
          this.registroCorrecto = true;

        }, error => {
          this.registroIncorrecto = true;
          this.msgError = error.error;

        }
      );
    }
  }

  /**
   * Get para obtener el titulo del formulario.
   */
  get titulo(){
    return this.FormularioAlta.get('titulo');
  }
  /**
   * Get para obtener la descripción del formulario.
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
      this.noticia.id = this.datosNoticiaService.noticia.id;
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

  /**
   * Al inicializar el componente se establecen los valores del formulario, gracias a los valores
   * que se tiene el servicio datosNoticiaService.
   */
  ngOnInit(): void {
    this.titulo.setValue(this.datosNoticiaService.noticia.titulo);
    this.descripcion.setValue(this.datosNoticiaService.noticia.descripcion);
  }

}
