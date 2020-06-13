import { Injectable } from '@angular/core';
import {Noticia} from '../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class DatosNoticiaService {
  /**
   * Variable que almacena la noticia.
   */
  private _noticia: Noticia;

  /**
   * Contructor vacio, se inicializa con una noticia nueva
   */
  constructor() { }

  /**
   * Permite cambiar el valor de la noticia.
   * @param noticia
   */
  set noticia(noticia: Noticia){
    this._noticia = noticia
  }

  /**
   * Permite obtener la noticia.
   */
  get noticia (){
    return this._noticia;
  }
}
