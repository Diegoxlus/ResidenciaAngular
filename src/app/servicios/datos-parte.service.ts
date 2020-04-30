import { Injectable } from '@angular/core';
import {Habitacion} from '../models/habitacion';
import {Parte} from '../models/parte';

@Injectable({
  providedIn: 'root'
})
export class DatosParteService {

  public parte: Parte;
  constructor() {
    this.parte = new Parte();
  }

  cambiarParte(ParteNuevo : Parte){
    this.parte = ParteNuevo;
  }
}
