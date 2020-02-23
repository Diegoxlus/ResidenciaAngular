import { Injectable } from '@angular/core';
import {Habitacion} from '../models/habitacion';

@Injectable({
  providedIn: 'root'
})
export class DatosHabitacionService {

  public habitacion: Habitacion;
  constructor() {
    this.habitacion = new Habitacion();
  }

  cambiarHabitacion(habitacionNueva : Habitacion){
    this.habitacion = habitacionNueva;
  }
}
