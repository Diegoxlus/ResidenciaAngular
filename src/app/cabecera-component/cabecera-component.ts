import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../servicios/usuario.service';
import {Usuario} from '../models/usuario.model';
import {Router} from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera-component.html',
  styleUrls: ['./cabecera-component.css']
})
export class CabeceraComponent implements OnInit {
  private usuarioLogin: Usuario;
  private usuarioRegistro: Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuarioLogin = new Usuario(null, null, null, null);
    this.usuarioRegistro = new Usuario("", "", null, null,null,null,null);

  }

  ngOnInit() {
    if (!this.usuarioLogin.logueado) {
      this.router.navigate(['']);
    }
  }

  login() {
    this.usuarioService.login(this.usuarioLogin.email, this.usuarioLogin.pass).subscribe(
      result => {
        if (result.status === 200) {
          this.usuarioLogin.email = result.body.email;
          this.usuarioLogin.nombre = result.body.nombre;
          this.usuarioLogin.apellidos = result.body.apellidos;
          this.usuarioLogin.dni = result.body.dni;
          this.usuarioLogin.pass = result.body.contrasena;
          this.usuarioLogin.rol = result.body.rol;
          this.usuarioLogin.logueado = true;
          console.log(this.usuarioRegistro);

          window.sessionStorage.setItem('email', this.usuarioLogin.email);
          window.sessionStorage.setItem('pass', this.usuarioLogin.pass);

          this.router.navigate(['/menu-directora']);
          $('#modalLoginForm').modal('toggle');
        } else {
          this.usuarioLogin.email = '';
          this.usuarioLogin.pass = '';
          console.log(result);
        }

      },
      error => {
        console.log(error as any);
      })
    ;
  }

  registrar() {
    this.usuarioRegistro.rol=3;
    this.usuarioService.registrar(this.usuarioRegistro).subscribe(
      result => {
        if (result.status === 200) {
          console.log(this.usuarioRegistro);
          this.router.navigate(['/menu-directora']);
          $('#modalLoginForm').modal('toggle');
        } else {
          this.usuarioLogin.email = '';
          this.usuarioLogin.pass = '';
        }

      },
      error => {
        console.log(error as any);
      })
    ;
  }

  exit() {
    this.usuarioLogin.logueado = false;
    window.sessionStorage.clear();
    this.router.navigate(['']);
  }
  get diagnostic() { return JSON.stringify(this.usuarioRegistro); }

}
