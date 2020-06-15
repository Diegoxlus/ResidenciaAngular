import { Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Permanencia} from '../models/permanencia';
import {PermanenciaService} from '../servicios/permanencia.service';

/**
 * Componente que emplean los residentes para anotarse los fin de semana
 */

@Component({
  selector: 'app-anotarse-finde',
  templateUrl: './anotarse-finde.component.html',
  styleUrls: ['./anotarse-finde.component.css']
})
export class AnotarseFindeComponent{
  /**
   * Fecha minima a partir de la cual se puede anotar el residente, empleada para mostrar unicamente
   * los días a partir del actual en el datapicker.
   */
  minDate;
  /**
   * Variable donde vamos a almacenar la nueva permanencia del residente.
   */
  nuevaPermanencia: Permanencia;
  /**
   * Variable empleada para mostrar los mensajes, en el caso de que el registro sea correcto se cambiará
   * a true.
   */
  registroCorrecto: boolean = false;
  /**
   * Variable empleada para mostrar los mensajes, en el caso de que el registro sea incorrecto se cambiará
   * a true.
   */
  registroIncorrecto: boolean = false;
  /**
   * Variable donde se establecerá el mensaje de error en el caso de que la petición a la API REST devuelva un
   * código de error con el mensaje correspondiente.
   */
  msgError:String;

  /**
   * Objeto de tipo FormGroup empleado para validar el formulario.
   */
  public FormularioAltaFinde = new FormGroup({
    fecha: new FormControl('', [
      Validators.required,
    ])
  });

  /**
   * Variable que contiene la fecha seleccionada en el datapicker.
   */
  private sfecha:string;

  /**
   * En el constructor instanciamos el servicio que vamos a usar: PermanenciaService, el datepipe para transformar las fechas,
   * y el router, pera navegar entre componentes.
   * @param permanenciaService
   * @param datepipe
   * @param router
   */
  constructor(private permanenciaService: PermanenciaService, public datepipe: DatePipe,private router: Router) {
    /**
     * Instanciamos la nueva permanencia.
     */
    this.nuevaPermanencia = new Permanencia();
    /**
     * Instanciamos la fecha a la fecha actual.
     */
    this.minDate = new Date();
  }

  /**
   * Permite obtener la fecha marcada en el DataPicker.
   */
  get fecha(){
    return this.FormularioAltaFinde.get('fecha');
  }

  /**
   * Filtro empleado para mostrar unicamente los días correspondientes al fin de semana.
   * @param d
   */
  filtro = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day == 0 || day == 6;
  };

  /**
   * Método empleado para dar de alta una nueva permanencia.
   * Transformamos la fecha para añadirla a la instancia nueva permanencia.
   * Enviamos la nueva permanencia a la API REST y obtenemos la respuesta.
   * Si la respuesta es correcta establecemos la variable registroCorrecto a true, entonces se mostrará
   * el mensaje de que se creo la nueva permanencia con éxito.
   * Si la respues no es correcta, obtenemos el mensaje de error y lo mostramos en la vista.
   *
   */
  altaPermanencia() {
    this.resetearIntento();
    /**
     * Variable local, se crea un objeto Date, con la fecha del DatePicker.
     */
    let fecha = new Date(this.fecha.value);

    this.sfecha = this.datepipe.transform(fecha,'yyyy-MM-dd').toString();

    this.nuevaPermanencia.dia = this.sfecha;
    this.permanenciaService.addPermanencia(this.nuevaPermanencia).subscribe(
      result=>{
        this.registroCorrecto=true;

      },error=>{
        this.msgError = error.error;
        this.registroIncorrecto=true;
      }
    )
  }

  /**
   * Permite resetear los mensajes del formulario, establecion los valores de registro a false.
   */
  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  /**
   * Vuelve al menu de residente.
   */
  volver() {
    this.router.navigate(['menu-residente']);
  }
}
