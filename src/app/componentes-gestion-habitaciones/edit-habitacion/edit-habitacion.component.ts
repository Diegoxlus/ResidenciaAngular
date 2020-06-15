import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectResidentesComponent} from '../select-residentes/select-residentes.component';
import {Habitacion} from '../../models/habitacion';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HabitacionService} from '../../servicios/habitacion.service';
import {Router} from '@angular/router';
import {DatosHabitacionService} from '../../servicios/datos-habitacion.service';
import {faUserMinus} from '@fortawesome/free-solid-svg-icons/faUserMinus';
import {DialogoConfirmacionComponent} from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {UsuarioService} from '../../servicios/usuario.service';

/**
 * Componente empleado para editar una habitación
 */

@Component({
  selector: 'app-edit-habitacion',
  templateUrl: './edit-habitacion.component.html',
  styleUrls: ['./edit-habitacion.component.css']
})
export class EditHabitacionComponent implements OnInit {
  /**
   * Tiene como componente hijo un select de residentes personalizado.
   */
  @ViewChild(SelectResidentesComponent,{static:true}) selectResidentes;
  /**
  * MatDialog empleado para mostrar un dialogo de confirmación al eliminar un residente de la habitación
   */
  dialogRef: MatDialogRef<DialogoConfirmacionComponent>;
  /**
  * Icono papelera para eliminar al residente1
   */
  eliminarRes1 = faUserMinus;
  /**
   * Icono papelera para eliminar al residente2
   */
  eliminarRes2 = faUserMinus;
  /**
   * Instancia de la habitación, por ahora vacia.
   */
  habitacion: Habitacion;

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
   * Variable boolean empleada para cerrar el contenedor de residente en caso de que los haya.
   * Cuando se cierra el contenedor, esta variable se establece a falso, y este se deja de mostrar.
   */
  hayResidentes: boolean = true;

  /**
   * FormGroup que contiene los requisitios que tiene que cumplir el formulario, es decir es empleado
   * para validar los campos del formulario y acceder a estos.
   */
  public FormularioAlta = new FormGroup({
    numeroAlta: new FormControl('', [
      Validators.required,
      Validators.pattern("[0-9]*")]),
    tipoAlta: new FormControl('', [
      Validators.required,

    ]),
    residenteAlta: new FormControl('', [
      Validators.required ]),
    disponibleAlta: new FormControl(true, [])
  });

  /**
   * Constructor de la clase, empleamos los servicios:
   * usuarioService: Para el select de los residentes.
   * habitaciónService: Para comunicarnos con la API REST y poder editar la habitación
   * datosHabitaciones: Para enviar la habitación entre componentes, es decir cuando se pincha en editar
   * en la lista de habitaciones, en este servicio se guarda esa habitación y se obtiene en el componente
   * editar, en este mismo componente.
   * El router para navegar entre componentes, y el dialog para mostrar la confirmación al eliminar una habitación.
   * @param usuaroService
   * @param habitacionService
   * @param datosHabitaciones
   * @param router
   * @param dialog
   */
  constructor(public usuaroService: UsuarioService,private habitacionService: HabitacionService,public datosHabitaciones: DatosHabitacionService,public router: Router,public dialog: MatDialog){
    this.habitacion = datosHabitaciones.habitacion;
    this.selectResidentes = new SelectResidentesComponent(this.usuaroService);
  }

  /**
   * Método empleado para editar una habitación.
   * Enviamos la habitación a la API REST y obtenemos la respuesta.
   * Si la respuesta es correcta establecemos la variable registroCorrecto a true, entonces se mostrará
   * el mensaje de que se edito la habitación con éxito.
   * Si la respues no es correcta, obtenemos el mensaje de error y lo mostramos en la vista.
   *
   */
  editarHabitacion() {
    this.pasarValoresHabitacion();
    this.resetearIntento();

    this.habitacionService.editarHabitacion(this.habitacion).subscribe(data=>{

        this.registroCorrecto=true;
        this.disponibleAlta.setValue(this.habitacion.disponible);
      },error =>{
        this.registroIncorrecto = true;
        this.msgError = error.error;

      }
    );
  }

  /**
   * Permite obtener el numero de la habitación del formulario para obtener su valor o modificarlo
   */
  get numeroAlta(){
    return this.FormularioAlta.get('numeroAlta');
  }
  /**
   * Permite obtener el tipo de habitación del formulario para obtener su valor o modificarlo
   */
  get tipoAlta(){
    return this.FormularioAlta.get('tipoAlta');
  }
  /**
   * Permite obtener la disponibilidad de la habitación del formulario para obtener su valor o modificarlo
   */
  get disponibleAlta(){
    return this.FormularioAlta.get('disponibleAlta');
  }

  /**
   * Permite pasar los valor que vienen del servicio datosHabitacion al formulario.
   */
  private pasarValoresFormulario() {
    this.numeroAlta.setValue(this.habitacion.numero);
    this.tipoAlta.setValue(this.habitacion.tipo);
    this.selectResidentes.tipo = this.habitacion.tipo;
    if(this.habitacion.disponible.value!=null){
      this.disponibleAlta.setValue(this.habitacion.disponible);

    }
  }

  /**
   * Permite pasar los valores del formulario a nuestro instancia de la clase Habitación.
   */
  private pasarValoresHabitacion() {

    this.habitacion.numero = this.numeroAlta.value;
    this.habitacion.tipo = this.tipoAlta.value;
    // @ts-ignore
    if(this.selectResidentes.selecionResidentes[0]!=undefined && this.selectResidentes.selecionResidentes[0]!=undefined){
      // @ts-ignore
      this.habitacion.residente1 = this.selectResidentes.selecionResidentes[0].email;
    }
    else{
      this.habitacion.residente1= null;
    }
    // @ts-ignore
    if(this.selectResidentes.selecionResidentes[1]!=undefined && this.selectResidentes.selecionResidentes[1]!=undefined){
      // @ts-ignore
      this.habitacion.residente2 = this.selectResidentes.selecionResidentes[1].email;
    }
    else{
      this.habitacion.residente2=null;
    }
    this.habitacion.disponible = this.disponibleAlta.value;
  }
  /**
   * Permite resetear los mensajes del formulario, establecion los valores de registro a false.
   */
  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }


  /**
   * Cuando iniciamos el componente, primeramente lo que hacemos es pasar los valores al formulario.
   */
  ngOnInit(): void {

    this.pasarValoresFormulario();

  }

  /**
   * Metodo empleado para cambiar el tipo de habitación, se edita el select de residente y solo deja
   * seleccionar 1 o 2 residentes dependiendo de si la habitación es individual o doble.
   * @param value
   */
  cambioTipo(value: any) {
    this.selectResidentes.tipo = value;
    this.selectResidentes.changed();

  }

  /**
   * Metodo empleado para eliminar un residente de una habitación, se pasa como parametro el residente
   * y el numero de la habitación en el que está.
   * @param numero
   * @param residente
   */
  eliminarResidente(numero: any, residente: any) {
    this.habitacionService.eliminarResidenteHabitacion(numero,residente).subscribe(
      result=>{
        if(this.datosHabitaciones.habitacion.residente1==residente){
          this.datosHabitaciones.habitacion.residente1=null;
        }
        if(this.datosHabitaciones.habitacion.residente2==residente){
          this.datosHabitaciones.habitacion.residente2=null;
        }


      },error => {

      }
    )
  }

  /**
   * Dialogo de confirmación para eliminar el residete de una habitación, si idicamos que lo queremos eliminar,
   * se llama al método eliminarResidente con los parametros que se le pasan a este método.
   * @param numero
   * @param residente
   */
  openConfirmationDialog(numero: any, residente: any) {
    this.dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Estas seguro de que quieres eliminar a "+ residente +" de la habitacion " + numero;

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.eliminarResidente(numero,residente);
      }
      this.dialogRef = null;
    });
  }
}
