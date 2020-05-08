import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-edit-habitacion',
  templateUrl: './edit-habitacion.component.html',
  styleUrls: ['./edit-habitacion.component.css']
})
export class EditHabitacionComponent implements AfterViewInit, OnInit {
  @ViewChild(SelectResidentesComponent,{static:true}) selectResidentes;
  dialogRef: MatDialogRef<DialogoConfirmacionComponent>;
  eliminarRes1 = faUserMinus;
  eliminarRes2 = faUserMinus;
  habitacion: Habitacion;
  registroCorrecto : boolean = false;
  registroIncorrecto : boolean = false;
  msgError: string;
  hayResidentes: boolean = true;

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

  constructor(public usuaroService: UsuarioService,private habitacionService: HabitacionService,private datosHabitaciones: DatosHabitacionService,private router: Router,public dialog: MatDialog){
    this.habitacion = datosHabitaciones.habitacion;
    this.selectResidentes = new SelectResidentesComponent(this.usuaroService);
  }


  editarHabitacion() {
    this.pasarValoresHabitacion();
    this.resetearIntento();
    console.log(this.habitacion);
    this.habitacionService.editarHabitacion(this.habitacion).subscribe(data=>{
      console.log(data);
        this.registroCorrecto=true;



      },error =>{
        this.registroIncorrecto = true;
        this.msgError = error.error;

      }
    );
  }

  onSubmit() {
    console.log(this.habitacion);
  }

  get numeroAlta(){
    return this.FormularioAlta.get('numeroAlta');
  }
  get tipoAlta(){
    return this.FormularioAlta.get('tipoAlta');
  }
  get residente1Alta(){
    return this.FormularioAlta.get('residente1Alta');
  }

  get residente2Alta(){
    return this.FormularioAlta.get('residente2Alta');
  }

  get disponibleAlta(){
    return this.FormularioAlta.get('disponibleAlta');
  }

  private pasarValoresFormulario() {
    console.log(this.habitacion.tipo);
    this.numeroAlta.setValue(this.habitacion.numero);
    this.tipoAlta.setValue(this.habitacion.tipo);
    console.log("TIPO DEL EDIT" +this.habitacion.tipo);
    this.selectResidentes.tipo = this.habitacion.tipo;
    if(this.habitacion.disponible.value!=null){
      this.disponibleAlta.setValue(this.habitacion.disponible);

    }
  }

  private pasarValoresHabitacion() {
    console.log("-------------------");
    console.log(this.selectResidentes.selecionResidentes[0]);
    console.log(this.selectResidentes.selecionResidentes[1]);
    console.log("-------------------");



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

  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

    this.pasarValoresFormulario();

  }

  cambioTipo(value: any) {
    console.log("CAMBIO DE TIPO");
    console.log(value);
    this.selectResidentes.tipo = value;
    this.selectResidentes.changed();

  }

  eliminarResidente(numero: any, residente: any) {
    this.habitacionService.eliminarResidenteHabitacion(numero,residente).subscribe(
      result=>{
        if(this.datosHabitaciones.habitacion.residente1==residente){
          this.datosHabitaciones.habitacion.residente1=null;
        }
        if(this.datosHabitaciones.habitacion.residente2==residente){
          this.datosHabitaciones.habitacion.residente2=null;
        }
        console.log(result);

      },error => {
        console.log(error);
      }
    )
  }

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
