import { Injectable } from '@angular/core';
import {Noticia} from '../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class DatosNoticiaService {
  private _noticia: Noticia;

  constructor() { }

  set noticia(noticia: Noticia){
    this._noticia = noticia
  }

  get noticia (){
    return this._noticia;
  }
}
