import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Habitacion} from '../../models/habitacion';
import {HabitacionService} from '../../servicios/habitacion.service';
import {SelectResidentesComponent} from '../select-residentes/select-residentes.component';

@Component({
  selector: 'app-alta-habitacion',
  templateUrl: './alta-habitacion.component.html',
  styleUrls: ['./alta-habitacion.component.css'],
})
export class AltaHabitacionComponent implements OnInit {
  // @ts-ignore
  @ViewChild(SelectResidentesComponent)
  private selectResidentes: SelectResidentesComponent;

  nuevaHabitacion: Habitacion;
  registroCorrecto : boolean = false;
  registroIncorrecto : boolean = false;
  msgError: string;

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

  constructor(private habitacionService: HabitacionService ,private router: Router){
    this.nuevaHabitacion = new Habitacion();
  }


  altaHabitacion() {
    this.pasarValoresHabitacion();
    this.resetearIntento();
    this.habitacionService.registrarHabitacion(this.nuevaHabitacion).subscribe(data=>{
        this.registroCorrecto=true;
        this.FormularioAlta.reset();
        this.selectResidentes.restart();


      },error =>{
        this.registroIncorrecto = true;
        this.msgError = error.error;

      }
    );
  }

  onSubmit() {
    console.log(this.nuevaHabitacion);
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
    this.numeroAlta.setValue(this.nuevaHabitacion.numero);
    this.tipoAlta.setValue(this.nuevaHabitacion.tipo);
    this.residente1Alta.setValue(this.nuevaHabitacion.residente1);
    this.residente2Alta.setValue(this.nuevaHabitacion.residente2);
    this.disponibleAlta.setValue(this.nuevaHabitacion.disponible);

  }

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

  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  ngOnInit(): void {
  }

}
