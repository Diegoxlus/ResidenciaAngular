import {Component, ViewChild} from '@angular/core';
import {SelectResidentesComponent} from '../../componentes-gestion-habitaciones/select-residentes/select-residentes.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsuarioService} from '../../servicios/usuario.service';
import {Parte} from '../../models/parte';
import {ParteService} from '../../servicios/parte.service';

/**
 * Componente empleado para el alta de un nuevo parte.
 */
@Component({
  selector: 'app-alta-parte',
  templateUrl: './alta-parte.component.html',
  styleUrls: ['./alta-parte.component.css']
})

export class AltaParteComponent{
  /**
   * Componente hijo, un select para seleccionar un residente.
   */
  @ViewChild(SelectResidentesComponent,{static:false}) selectResidentes;
  /**
   * Para nuevo que se va a añadir
   */
  parte: Parte;
  /**
   * Variable booleana, en caso de que el registro sea correcto se establece a true.
   */
  registroCorrecto : boolean = false;
  /**
   * Variable booleana, en caso de que el registro sea incorrecto se establece a true.
   */
  registroIncorrecto : boolean = false;
  /**
   * En caso de que el registro sea incorrecto se le asigna el mensaje de error de la API REST.
   */
  msgError: string;
  /**
   * FormGroup empleado para validar y obtener los campos del formulario.
   */
  public FormularioAlta = new FormGroup({
    gravedad: new FormControl(0, [
      Validators.required,
    ]),
    residenteAlta: new FormControl('', [
      Validators.required ]),
    motivo: new FormControl('', [
      Validators.required

    ])
  });

  /**
   * Constructor del componente, se instancian:
   * parteService: Servicio empleado para comunicarnos con la API REST
   * router: Empleado para navegar entre los componentes
   * usuarioService: Empleado para comunicarnos con la API REST, con el fin de obtener los residentes.
   * @param parteService
   * @param router
   * @param usuarioService
   */
  constructor(private parteService: ParteService,public router: Router, usuarioService: UsuarioService){
    this.parte = new Parte();

  }

  /**
   * Permite dar de alta un nuevo parte. Se comprueban que todos los campos sean correctos, si lo son se
   * envia la petición de alta a la API REST, si esta falla muestra un mensaje de error.
   */
  altaParte() {

    this.pararValoresParte();
    if (this.parte.gravedad == undefined || this.parte.residente == undefined || this.parte.motivo == undefined) {
      this.registroIncorrecto = true;
    } else {
      this.resetearIntento();
      this.parteService.registrarParte(this.parte).subscribe(data => {
          this.registroCorrecto = true;


        }, error => {
          this.registroIncorrecto = true;
          this.msgError = error.error;

        }
      );
    }
  }

  /**
   * Permite acceder al campo gravedad del formulario.
   */
  get gravedad(){
    return this.FormularioAlta.get('gravedad');
  }

  /**
   * Permite acceder al campo motivo del formulario.
   */
  get motivo(){
    return this.FormularioAlta.get('motivo');
  }

  /**
   * Permite pasar los valores del formulario al parte, después de comprobar que estos sean correctos.
   */
  private pararValoresParte() {
  if(isNaN(this.gravedad.value)|| !this.selectResidentes.selecionResidentes[0].email || !this.motivo.value){
    this.msgError = "Rellena todos los campos del formulario";
  }
  else{
    this.parte.gravedad = this.gravedad.value;
    this.parte.residente = this.selectResidentes.selecionResidentes[0].email;
    this.parte.motivo = this.motivo.value;
  }



  }
  /**
   * Permite resetear los mensajes del formulario, establecion los valores de registro a false.
   */
  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }


}
