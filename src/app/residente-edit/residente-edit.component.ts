import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioService} from '../servicios/usuario.service';
import {Usuario} from '../models/usuario.model';
import {DatosUsuarioService} from '../servicios/datos-usuario.service';

@Component({
  selector: 'app-residente-edit',
  templateUrl: './residente-edit.component.html',
  styleUrls: ['./residente-edit.component.css'],

})
export class ResidenteEditComponent implements OnInit {
  residente: Usuario;
  roles = ['Director/a','Secretario/a', 'Cocinero/a', 'Residente/a'];

  constructor(private datos: DatosUsuarioService,private usuarioService: UsuarioService ,private router: Router){
    this.residente = new Usuario(this.datos.usuario.nombre,this.datos.usuario.apellidos,this.datos.usuario.email,'',this.datos.usuario.dni,this.datos.usuario.f_nac,this.datos.usuario.rol);
  }


  ngOnInit() {

    console.log(this.residente);
  }


  modificarResidente() {
    this.usuarioService.modificarResidente(this.residente).subscribe(data=>{
      console.log(data);
    });
  }

  onSubmit() {
    console.log(this.residente);
  }

}
