import { Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Permanencia} from '../models/permanencia';
import {PermanenciaService} from '../servicios/permanencia.service';

@Component({
  selector: 'app-anotarse-finde',
  templateUrl: './anotarse-finde.component.html',
  styleUrls: ['./anotarse-finde.component.css']
})
export class AnotarseFindeComponent{
  minDate;
  nuevaPermanencia: Permanencia;
  registroCorrecto: boolean = false;
  registroIncorrecto: boolean = false;
  msgError:String;

  public FormularioAltaFinde = new FormGroup({
    fecha: new FormControl('', [
      Validators.required,
    ])
  });

  private sfecha:string;

  constructor(private permanenciaService: PermanenciaService, public datepipe: DatePipe,private router: Router) {
    this.nuevaPermanencia = new Permanencia();
    this.minDate = new Date();
  }


  get fecha(){
    return this.FormularioAltaFinde.get('fecha');
  }

  filtro = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day == 0 || day == 6;
  };


  altaPermanencia() {
    this.resetearIntento();
    let fecha = new Date(this.fecha.value);
    console.log(fecha);
    this.sfecha = this.datepipe.transform(fecha,'yyyy-MM-dd').toString();
    console.log(this.sfecha);
    this.nuevaPermanencia.dia = this.sfecha;
    this.permanenciaService.addPermanencia(this.nuevaPermanencia).subscribe(
      result=>{
        this.registroCorrecto=true;
        console.log(result);
      },error=>{
        this.msgError = error.error;
        this.registroIncorrecto=true;
      }
    )
  }

  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  volver() {
    this.router.navigate(['menu-residente']);
  }
}
