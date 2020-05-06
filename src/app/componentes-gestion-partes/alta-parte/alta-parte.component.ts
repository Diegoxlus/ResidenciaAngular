import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectResidentesComponent} from '../../componentes-gestion-habitaciones/select-residentes/select-residentes.component';
import {Habitacion} from '../../models/habitacion';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsuarioService} from '../../servicios/usuario.service';
import {Parte} from '../../models/parte';
import {ParteService} from '../../servicios/parte.service';

@Component({
  selector: 'app-alta-parte',
  templateUrl: './alta-parte.component.html',
  styleUrls: ['./alta-parte.component.css']
})
export class AltaParteComponent implements OnInit {

  @ViewChild(SelectResidentesComponent,{static:true}) selectResidentes;

  parte: Parte;
  registroCorrecto : boolean = false;
  registroIncorrecto : boolean = false;
  msgError: string;

  public FormularioAlta = new FormGroup({
    gravedad: new FormControl('', [
      Validators.required,
    ]),
    residenteAlta: new FormControl('', [
      Validators.required ]),
    motivo: new FormControl('', [
      Validators.required

    ])
  });

  constructor(private parteService: ParteService,private router: Router, usuarioService: UsuarioService){
    this.parte = new Parte();
    this.selectResidentes = new SelectResidentesComponent(usuarioService);
  }


  altaParte() {
    this.pararValoresParte();
    if (this.parte.gravedad == undefined || this.parte.residente == undefined || this.parte.motivo == undefined) {
      this.registroIncorrecto = true;
    } else {
      this.resetearIntento();
      this.parteService.registrarParte(this.parte).subscribe(data => {
          this.registroCorrecto = true;
          this.FormularioAlta.reset();
          this.selectResidentes.restart();


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

  private pararValoresParte() {

  if(!this.gravedad.value|| !this.selectResidentes.selecionResidentes[0].email || !this.motivo.value){
    this.msgError = "Rellena todos los campos del formulario";
  }
  else{
    this.parte.gravedad = this.gravedad.value;
    this.parte.residente = this.selectResidentes.selecionResidentes[0].email;
    this.parte.motivo = this.motivo.value;
  }



  }

  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  ngOnInit(): void {

  }

}
