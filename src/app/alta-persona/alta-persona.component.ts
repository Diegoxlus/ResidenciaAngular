import { Component, OnInit } from '@angular/core';
import {Usuario} from '../models/usuario.model';
import {UsuarioService} from '../usuario.service';
import {FormsModule} from '@angular/forms';

// import { FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-alta-persona',
  templateUrl: './alta-persona.component.html',
  styleUrls: ['./alta-persona.component.css']
})
export class AltaPersonaComponent implements OnInit {
  roles = ['Secretario/a', 'Cocinero/a', 'Residente/a'];
  usuario;
  enviado;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.enviado = false;
    this.usuario = new Usuario('', '', '');
    /*this.formularioValido = this.formBuilder.group({
      nombre: '',
      apellidos: '',
      email: '',
      pass: '',
      rol: ''
    });*/
  }

  ngOnInit() {
  }
  onSubmit() {
  this.enviado = true;
  this.pipeRol(this.usuario);
      this.usuarioService.registroManual(this.usuario).subscribe(
        result => {
          if (result.status === 200) {
            console.log("OKKKKK");
          } else {
            console.log("ERROR")
          }

        },
        error => {
          console.log(error as any);
        })
      ;


  }
  get diagnostic() { return JSON.stringify(this.usuario); }

  private pipeRol(usuario: Usuario) {
    switch (usuario.rol) {
      case "Residente/a": usuario.rol=3;
        break;
      case "Secretario/a": usuario.rol=1;
        break;
      case "Cocinero/a": usuario.rol=2;
        break;

    }
  }

}
