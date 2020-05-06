import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {ConfiguracionService} from '../servicios/configuracion.service';
import {Configuracion} from '../models/configuracion';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  registroCorrecto: boolean = false;
  registroIncorrecto: boolean = false;
  msgError:String;
  private configuaracion;

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


  constructor(private configuracionService: ConfiguracionService, public datepipe: DatePipe,private router: Router) {

  }

  ngOnInit() {

    this.configuracionService.getConfiguracion().subscribe(
      result =>{
        if(result==false){
          this.msgError = "No existe una configuracion, porfavor rellene el formulario";
          this.registroIncorrecto = true;
        }
        else{
          this.configuaracion = new Configuracion(result.id,result.hora_comida,result.hora_cena,result.limite_hora_comida,result.limite_hora_cena,result.registro)
          console.log(this.configuaracion.hora_cena.substring(0,5));
          this.limiteComida.setValue(this.configuaracion.limite_hora_comida);
          this.limiteCena.setValue(this.configuaracion.limite_hora_cena);
          this.horaComida.setValue(this.configuaracion.hora_comida.substring(0,5));
          this.horaCena.setValue(this.configuaracion.hora_cena.substring(0,5));
          this.registro.setValue(this.configuaracion.registro);
        }
      }
    )


  }

  get horaComida(){
    return this.FormularioAlta.get('horaComida');
  }

  get horaCena() {
    return this.FormularioAlta.get('horaCena');
  }

  get limiteComida(){
    return this.FormularioAlta.get('limiteComida');
  }

  get limiteCena(){
    return this.FormularioAlta.get('limiteCena');
  }

  get registro(){
    return this.FormularioAlta.get('registro');

  }


  filtro = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  onSubmit() {

  }

  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  volver() {
    this.router.navigate(['menu-directora']);
  }

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
