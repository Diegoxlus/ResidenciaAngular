import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/de';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PagoService} from '../../servicios/pago.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-alta-pago',
  templateUrl: './alta-pago.component.html',
  styleUrls: ['./alta-pago.component.css']
})
export class AltaPagoComponent{

  selectedYearAsText: string;
  selectedMonthIndex: number;
  selectedMonthAsText: string;
  srcResult: any;
  fileName:string;
  file: any;
  registroCorrecto : boolean = false;
  registroIncorrecto : boolean = false;
  msgError: string;

  public FormularioAlta = new FormGroup({
    mes: new FormControl('', [
      Validators.required,
    ]),
    archivo: new FormControl('', [
      Validators.required ])
  });

  constructor(private pagoService: PagoService, private router : Router){}

  onChange(event: { monthIndex: number, year: number }) {
    this.selectedYearAsText = event.year.toString();
    console.log(moment().month(event.monthIndex).format('MMMM'));
    this.selectedMonthIndex = event.monthIndex;
    this.selectedMonthAsText = moment().month(event.monthIndex).format('MMMM');
    console.warn(this.selectedYearAsText, this.selectedMonthAsText, `(month index: ${this.selectedMonthIndex})`);
  }

  public fileProgress(fileInput: any) {
    this.file = fileInput.target.files[0];
    this.fileName = this.file.name;
    var fileNameExtension = "." + this.fileName.split(".").pop();
    this.fileName = this.fileName.substring(0, 8) + fileNameExtension;
  }

  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }


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
