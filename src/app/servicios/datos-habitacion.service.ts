import { Injectable } from '@angular/core';
import {Habitacion} from '../models/habitacion';

/**
 * Injectable empleado para pasar una habitación entre componentes.
 */

@Injectable({
  providedIn: 'root'
})
export class DatosHabitacionService {
  /**
   * Habitacion que se modifica y obtiene entre componentes.
   */
  public habitacion: Habitacion;

  /**
   * Contructor vacio, se inicializa con una habitación nueva
   */
  constructor() {
    this.habitacion = new Habitacion();
  }

  /**
   * Permite cambiar la habitación.
   * @param habitacionNueva
   */
  cambiarHabitacion(habitacionNueva : Habitacion){
    this.habitacion = habitacionNueva;
  }
}
