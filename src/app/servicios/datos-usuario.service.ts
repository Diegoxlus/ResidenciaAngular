import { Injectable } from '@angular/core';
import {Usuario} from '../models/usuario';

@Injectable({providedIn: 'root'
})
export class DatosUsuarioService {
  /**
   * Variable que almacena a un usuario..
   */
  public usuario: Usuario;
  /**
   * Contructor vacio, se inicializa con un usuario nuevo.
   */
  constructor() {
    this.usuario = new Usuario("","");
  }

  /**
   * Permite cambiar el valor de la variable usuario por otra nuevo valor.
   * @param usuarioNuevo
   */
  cambiarUsuario(usuarioNuevo : Usuario){
    this.usuario = usuarioNuevo;
  }
}
