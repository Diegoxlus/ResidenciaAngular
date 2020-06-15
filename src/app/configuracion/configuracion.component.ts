import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {ConfiguracionService} from '../servicios/configuracion.service';
import {Configuracion} from '../models/configuracion';

/**
 * Componente que controla la configuración.
 */

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  /**
   * Variable booleana, en caso de que el registro sea correcto se establece a true.
   */
  registroCorrecto: boolean = false;
  /**
   * Variable booleana, en caso de que el registro sea incorrecto se establece a true.
   */
  registroIncorrecto: boolean = false;
  /**
   * Variable que contiene el mensaje de error que devuelve la API REST.
   */
  msgError:String;
  /**
   * Variable empleada para almacenar la configuración.
   */
  private configuaracion;
  /**
   * FormGroup que contiene los requisitios que tiene que cumplir el formulario, es decir es empleado
   * para validar los campos del formulario y acceder a estos.
   */
  public FormularioAlta = new FormGroup({
    limiteComida: new FormControl('', [
      Validators.maxLength(2),
      Validators.max(12),
      Validators.min(0)]),
    limiteCena: new FormControl('', [
      Validators.maxLength(2),
      Validators.max(12),
      Validators.min(0)]),
    horaComida: new FormControl('', [
      ]),
    horaCena: new FormControl('', [
      ]),
    registro: new FormControl('',[
    ])
  });

  /**
   * Constructor del componente, se instancia:
   * configuracionService: Permite comunicarnos con la API REST para obtener o editar la configuración.
   * datepipe: Permite realizar transformaciones con la fecha.
   * router: Permite navegar entre componentes.
   * @param configuracionService
   * @param datepipe
   * @param router
   */
  constructor(private configuracionService: ConfiguracionService, public datepipe: DatePipe,public router: Router) {

  }

  /**
   * Permite obtener la configuración, en caso de que no exista, muestra un mensaje de que no existe una configuración.
   * En el caso de que si que exista, rellena los campos del formulario con los valores de la configuración.
   */
  ngOnInit() {

    this.configuracionService.getConfiguracion().subscribe(
      result =>{
        if(result==false){
          this.msgError = "No existe una configuracion, porfavor rellene el formulario";
          this.registroIncorrecto = true;
        }
        else{
          this.configuaracion = new Configuracion(result.id,result.hora_comida,result.hora_cena,result.limite_hora_comida,result.limite_hora_cena,result.registro)
          this.limiteComida.setValue(this.configuaracion.limite_hora_comida);
          this.limiteCena.setValue(this.configuaracion.limite_hora_cena);
          this.horaComida.setValue(this.configuaracion.hora_comida.substring(0,5));
          this.horaCena.setValue(this.configuaracion.hora_cena.substring(0,5));
          this.registro.setValue(this.configuaracion.registro);
        }
      }
    )


  }

  /**
   * Permite acceder al campo hora comida del formulario.
   */
  get horaComida(){
    return this.FormularioAlta.get('horaComida');
  }

  /**
   * Permite acceder al campo hora cena del formulario.
   */
  get horaCena() {
    return this.FormularioAlta.get('horaCena');
  }

  /**
   * Permite acceder al campo limite hora comida del formulario.
   */
  get limiteComida(){
    return this.FormularioAlta.get('limiteComida');
  }

  /**
   * Permite acceder al campo limite hora comida del formulario.
   */
  get limiteCena(){
    return this.FormularioAlta.get('limiteCena');
  }

  /**
   * Permite acceder al campo registro del formulario.
   */
  get registro(){
    return this.FormularioAlta.get('registro');

  }


  /**
   * Permite resetear los mensajes del formulario, establecion los valores de registro a false.
   */
  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  /**
   * Permite volver al menu de la directora.
   */
  volver() {
    this.router.navigate(['menu-directora']);
  }

  /**
   * Edita la configuración, en el caso de que no exista la crea.
   */
  editarConfiguracion() {
    this.resetearIntento();
    let configuracion = new Configuracion('',this.horaComida.value,this.horaCena.value,this.limiteComida.value,this.limiteCena.value,this.registro.value);
    this.configuracionService.editarConfiguracion(configuracion).subscribe(
      result => {
          this.registroCorrecto = true;
      },error =>{
        this.msgError = "Error al guardar la configuración";
        this.registroIncorrecto = true;
      }
    )
  }
}
