import { Component} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/de';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PagoService} from '../../servicios/pago.service';
import {Router} from '@angular/router';

/**
 * Componente que permite dar de alta un nuevo pago.
 */
@Component({
  selector: 'app-alta-pago',
  templateUrl: './alta-pago.component.html',
  styleUrls: ['./alta-pago.component.css']
})
export class AltaPagoComponent{
  /**
   * Variable empleada para almacenar el año seleccionado.
   */
  selectedYearAsText: string;
  /**
   * Variable empleada para almacenar el mes seleccionado como numero:
   * 0 Enero
   * 1 Febrero
   * 2 Marzo
   * ...
   * 11 Diciembre
   */
  selectedMonthIndex: number;
  /**
   * Variable empleada para almacenar el año seleccionado.
   */
  selectedMonthAsText: string;
  /**
   * Nombre del comprobante de pago.
   */
  fileName:string;
  /**
   * Comprobante de pago ej: PDF, DOC...
   */
  file: any;
  /**
   * Variable booleana, en caso de que el registro sea correcto se establece a true.
   */
  registroCorrecto : boolean = false;
  /**
   * Variable booleana, en caso de que el registro sea incorrecto se establece a true.
   */
  registroIncorrecto : boolean = false;

  /**
   * En caso de que el registro sea incorrecto, guarda el mensaje de error de la API REST.
   */
  msgError: string;
  /**
   * FormGroup empleado para validar y obtener los campos del formulario.
   */
  public FormularioAlta = new FormGroup({
    mes: new FormControl('', [
      Validators.required,
    ]),
    archivo: new FormControl('', [
      Validators.required ])
  });

  /**
   * Constructor del componente, se instancia:
   * pagoService: Servicio para comunicarnos con la API REST
   * router: Para navegrar entre componentes.
   * @param pagoService
   * @param router
   */
  constructor(private pagoService: PagoService, public router : Router){}

  /**
   * Este metodo se ejecuta cuando se detecta un cambio en el mes del monthPicker
   * Se ontiene el mes y el año selecionado.
   * @param event
   */
  onChange(event: { monthIndex: number, year: number }) {
    this.selectedYearAsText = event.year.toString();
    console.log(moment().month(event.monthIndex).format('MMMM'));
    this.selectedMonthIndex = event.monthIndex;
    this.selectedMonthAsText = moment().month(event.monthIndex).format('MMMM');
  }

  /**
   * Este petodo se emplea para obtener el archivo subido por el residente.
   * Se recorta el nombre en el caso de que sea superior a 8 caracteres para que quede mas visual.
   * El archvo se guarda en la variable file.
   * @param fileInput
   */
  public fileProgress(fileInput: any) {
    this.file = fileInput.target.files[0];
    this.fileName = this.file.name;
    var fileNameExtension = "." + this.fileName.split(".").pop();
    this.fileName = this.fileName.substring(0, 8) + fileNameExtension;
  }

  /**
   * Permite resetear los valores de registro.
   */
  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  /**
   * Envia el archivo siempre y cuando sea válido a la API REST, mediante el metodo addPago.
   * addPago necesita el mes indexado, el año y el archivo.
   */
  enviar() {
    this.resetearIntento();
    if(this.file == undefined || this.selectedMonthIndex == undefined){
      this.msgError = "Selecciona un archivo valido y un mes";
      this.registroIncorrecto = true;
    }
    else{
      this.pagoService.addPago((this.selectedMonthIndex+1).toString()+'-'+this.selectedYearAsText,this.file).subscribe(
        result=>{
          this.registroCorrecto = true;
        },error=>{
          this.msgError= error.error;
          this.registroIncorrecto = true;

        }
      )
    }
    console.log(this.file);
    console.log(this.selectedMonthIndex);
  }
}
