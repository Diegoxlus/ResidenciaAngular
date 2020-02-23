import { Injectable } from '@angular/core';
import {Usuario} from '../models/usuario';

@Injectable({providedIn: 'root'
})
export class DatosUsuarioService {
  public usuario: Usuario;
  constructor() {
    this.usuario = new Usuario("","");
  }

  cambiarUsuario(usuarioNuevo : Usuario){
    this.usuario = usuarioNuevo;
  }
}
