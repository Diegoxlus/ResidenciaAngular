import {Component, OnInit} from '@angular/core';
import {Parte} from '../../models/parte';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ParteService} from '../../servicios/parte.service';
import {Router} from '@angular/router';
import {UsuarioService} from '../../servicios/usuario.service';
import {DatosParteService} from '../../servicios/datos-parte.service';

@Component({
  selector: 'app-edit-partes',
  templateUrl: './edit-partes.component.html',
  styleUrls: ['./edit-partes.component.css']
})
export class EditPartesComponent implements OnInit {
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
    gravedad: new FormControl('lleno', [
      Validators.required,
    ]),
    residenteAlta: new FormControl('lleno', [
      Validators.required ]),
    motivo: new FormControl('lleno', [
      Validators.required

    ])
  });
  /**
   * Contiene el valor de la gravedad de parte, se modifica al modificar el select.
   */
  selected: any;

  /**
   * Constructor del componente, se instancian:
   * parteService: Servicio empleado para comunicarnos con la API REST
   * router: Empleado para navegar entre los componentes
   * usuarioService: Empleado para comunicarnos con la API REST, con el fin de obtener los residentes.
   * datosParteService: Contiene los datos del parte que queremos editar.
   * @param parteService
   * @param datosParteService
   * @param router
   * @param usuarioService
   */
  constructor(private parteService: ParteService,private datosParteService: DatosParteService,public router: Router, usuarioService: UsuarioService){
    this.parte = new Parte();
  }

  /**
   * Metodo empleado para editar un parte, se pasan los valores del formulario al parte, si todos los
   * campos son correctos, el servicio se encarga de enviar el parte a la API REST y editarlo.
   */
  editarParte() {
    this.resetearIntento();
    let correcto = this.pasarValoresParte();
    if (this.parte.gravedad == undefined || this.parte.residente == undefined || this.parte.motivo == undefined || !correcto) {
      this.registroIncorrecto = true;
    } else {
      this.resetearIntento();
      this.parteService.editarParte(this.parte).subscribe(data => {
          this.registroCorrecto = true;
        }, error => {
          this.registroIncorrecto = true;
          this.msgError = error.error;

        }
      );
    }
  }

  /**
   * Permite obtener el campo gravedad del formulario.
   */
  get gravedad(){
    return this.FormularioAlta.get('gravedad');
  }

  /**
   * Permite obtener el campo motivo del formulario.
   */
  get motivo(){
    return this.FormularioAlta.get('motivo');
  }

  /**
   * Pasa los valores del formulario al parte.
   * Devuelve true en caso de que los valores sean correctos, y los asigna al parte.
   * Devuelve false en caso de que algún valor sea incorrecto, y no los asigna al parte.
   */
  private pasarValoresParte() {

    if(!this.gravedad.value|| !this.motivo.value){
      this.registroIncorrecto= true;
      this.msgError = "Rellena todos los campos del formulario";
      return false;
    }
    else{
      this.parte.gravedad = this.gravedad.value;
      this.parte.motivo = this.motivo.value;
      return true;
    }



  }

  /**
   * Este metodo permite pasar los datos del parte que se quiere editar a este componente.
   * Ahora el parte contiene los valores que se quieren editar.
   */
  private pasarValoresDatosParte() {
    this.parte.id = this.datosParteService.parte.id;
    this.parte.residente = this.datosParteService.parte.residente;
    this.parte.gravedad = this.datosParteService.parte.gravedad;
    this.parte.motivo = this.datosParteService.parte.motivo;
    this.parte.nombreResidente = this.datosParteService.parte.nombreResidente;
    this.parte.apellidosResidente = this.datosParteService.parte.apellidosResidente;

    this.gravedad.setValue(this.parte.gravedad);

  }
  /**
   * Permite resetear los mensajes del formulario, establecion los valores de registro a false.
   */
  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  /**
   * Cuando se inicia el componente obtenemos los valores del parte que vamos a editar.
   */
  ngOnInit(): void {
    this.pasarValoresDatosParte();
  }

}

