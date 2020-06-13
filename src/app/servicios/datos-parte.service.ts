import { Injectable } from '@angular/core';
import {Parte} from '../models/parte';

@Injectable({
  providedIn: 'root'
})
export class DatosParteService {
  /**
   * Variable que almacena el tipo de parte.
   */
  public parte: Parte;
  /**
   * Contructor vacio, se inicializa con un parte nuevo.
   */
  constructor() {
    this.parte = new Parte();
  }

  /**
   * Permite cambiar el valor del parte.
   * @param ParteNuevo
   */
  cambiarParte(ParteNuevo : Parte){
    this.parte = ParteNuevo;
  }
}
