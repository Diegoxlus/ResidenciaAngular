import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Habitacion} from '../../models/habitacion';
import {HabitacionService} from '../../servicios/habitacion.service';
import {SelectResidentesComponent} from '../select-residentes/select-residentes.component';
import {UsuarioService} from '../../servicios/usuario.service';

/**
 * Componente empleado para dar de alta una habitación
 */

@Component({
  selector: 'app-alta-habitacion',
  templateUrl: './alta-habitacion.component.html',
  styleUrls: ['./alta-habitacion.component.css'],
})
export class AltaHabitacionComponent{
  /**
   * Tiene un elemento hijo que es el Select personalizado de residentes.
   */
  @ViewChild(SelectResidentesComponent,{static:false}) selectResidentes;
  /**
   * Objeto empleado para guardar la nueva habitación.
   */
  nuevaHabitacion: Habitacion;
  /**
   * Variable booleana, en caso de que se registre la habitación se establece a true.
   */
  registroCorrecto : boolean = false;
  /**
   * Variable booleana, en caso de que el registro sea incorrecto se establece a true.
   */
  registroIncorrecto : boolean = false;
  /**
   * Variable que contiene el mensaje de error que devuelve la API REST.
   */
  msgError: string;

  /**
   * FormGroup que contiene los requisitios que tiene que cumplir el formulario, es decir es empleado
   * para validar los campos del formulario y acceder a estos.
   */
  public FormularioAlta = new FormGroup({
    numeroAlta: new FormControl('', [
      Validators.required,
      Validators.pattern("[0-9]*")]),
    tipoAlta: new FormControl(0, [
      Validators.required,

      ]),
    residenteAlta: new FormControl('', [
      Validators.required ]),
    disponibleAlta: new FormControl(true, [])
  });

  /**
   * En el constructor inicializamos los servicios que vamos a usar para comunicarnos con la API REST:
   * usuarioService: Para el select de residentes.
   * habitacionService: Para las habitaciones.
   * Y tambien el router, para navegar entre los componentes.
   * @param habitacionService
   * @param router
   * @param usuarioService
   */
  constructor(private habitacionService: HabitacionService ,public router: Router, usuarioService: UsuarioService){
    this.nuevaHabitacion = new Habitacion();

  }

  /**
   * Empleado para añadir una nueva habitación.
   */
  altaHabitacion() {
    this.pasarValoresHabitacion();
    this.resetearIntento();
    this.habitacionService.registrarHabitacion(this.nuevaHabitacion).subscribe(data=>{
        this.registroCorrecto=true;
      this.FormularioAlta.reset();
      this.tipoAlta.setValue(0);





      },error =>{
        this.registroIncorrecto = true;
        this.msgError = error.error;

      }
    );
  }

  /**
   * Permite obtener el numero del formulario para obtener su valor o modificarlo
   */
  get numeroAlta(){
    return this.FormularioAlta.get('numeroAlta');
  }
  /**
   * Permite obtener el tipo del formulario para obtener su valor o modificarlo
   */
  get tipoAlta(){
    return this.FormularioAlta.get('tipoAlta');
  }

  /**
   * Permite obtener el valor disponible del formulario para obtener su valor o modificarlo
   */
  get disponibleAlta(){
    return this.FormularioAlta.get('disponibleAlta');
  }

  /**
   * Metodo empleado para pasar los valores del formulario a la habitación.
   * 1) Se asignan los valores del formulario gracias a los get creados en arriba.
   * 2) Se pasan a la habitación que instanciamos.
   * 3) Comprobamos que los valores sean correctos.
   */
  private pasarValoresHabitacion() {

    this.nuevaHabitacion.numero = this.numeroAlta.value;
    this.nuevaHabitacion.tipo = this.tipoAlta.value;
    // @ts-ignore
    if(this.selectResidentes.selecionResidentes[0]!=undefined){
      // @ts-ignore
      this.nuevaHabitacion.residente1 = this.selectResidentes.selecionResidentes[0].email;
    }
    else{
      this.nuevaHabitacion.residente1=null
    }
    // @ts-ignore
    if(this.selectResidentes.selecionResidentes[1]!=undefined){
      // @ts-ignore
      this.nuevaHabitacion.residente2 = this.selectResidentes.selecionResidentes[1].email;
    }
    else{
      this.nuevaHabitacion.residente2=null;
    }
    this.nuevaHabitacion.disponible = this.disponibleAlta.value;
  }
  /**
   * Permite resetear los mensajes del formulario, establecion los valores de registro a false.
   */
  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  /**
   * Indica que se cambió el tipo de habitación, esto es útil porque en el metodo changed() del
   * selectResidentes permitimos seleccionar 1 o 2 residentes dependiendo del tipo.
   * @param value
   */
  cambioTipo(value: any) {
    this.selectResidentes.tipo=value;
    this.selectResidentes.changed();
  }
}
