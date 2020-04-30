import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectResidentesComponent} from '../../componentes-gestion-habitaciones/select-residentes/select-residentes.component';
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

  parte: Parte;
  registroCorrecto : boolean = false;
  registroIncorrecto : boolean = false;
  msgError: string;

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
  selected: any;

  constructor(private parteService: ParteService,private datosParteService: DatosParteService,private router: Router, usuarioService: UsuarioService){
    this.parte = new Parte();
  }


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

  onSubmit() {
    console.log(this.parte);
  }

  get gravedad(){
    return this.FormularioAlta.get('gravedad');
  }
  get motivo(){
    return this.FormularioAlta.get('motivo');
  }

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

  private pasarValoresDatosParte() {
    console.log(this.datosParteService.parte);
    this.parte.id = this.datosParteService.parte.id;
    this.parte.residente = this.datosParteService.parte.residente;
    this.parte.gravedad = this.datosParteService.parte.gravedad;
    this.parte.motivo = this.datosParteService.parte.motivo;
    this.parte.nombreResidente = this.datosParteService.parte.nombreResidente;
    this.parte.apellidosResidente = this.datosParteService.parte.apellidosResidente;

    this.gravedad.setValue(this.parte.gravedad);

  }

  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  ngOnInit(): void {
    this.pasarValoresDatosParte();
  }

}

