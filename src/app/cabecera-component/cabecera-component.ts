import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../servicios/usuario.service';
import {Usuario} from '../models/usuario';
import {Router} from '@angular/router';
import {FormControl,FormGroup,Validators} from '@angular/forms';


declare var $: any;

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera-component.html',
  styleUrls: ['./cabecera-component.css']
})
export class CabeceraComponent implements OnInit {
  private usuarioLogin: Usuario;
  private usuarioRegistro: Usuario;
  private intentoFallidoLogin:boolean;
  private intentoFallidoRegistro:boolean;

  public FormularioLogin = new FormGroup({
    emailLogin: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")]),
    contrasenaLogin: new FormControl('',[
      Validators.pattern("^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$"),
      Validators.minLength(6),
      Validators.maxLength(16),
      Validators.required
    ]
    )
  });

  public FormularioRegistro = new FormGroup({
    nombreRegistro: new FormControl('', [
      Validators.required,
      Validators.pattern("^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\']+[\\s]{0,1})+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])+[\\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])?$")]),
    apellidosRegistro: new FormControl('', [
      Validators.required,
      Validators.pattern("^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\']+[\\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])+[\\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])?$")]),
    dniRegistro: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]{8,8}[A-Za-z]$")]),
    emailRegistro: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")]),
    fNacRegistro: new FormControl('', [
      Validators.required,
      ]),
    contrasenaRegistro: new FormControl('',[
        Validators.pattern("^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$"),
        Validators.minLength(6),
        Validators.maxLength(16),
        Validators.required
      ]
    )
  });
  msgError: String;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuarioLogin = new Usuario(null, null, null, null);
    this.usuarioRegistro = new Usuario("", "", null, null,null,null,null);
    this.intentoFallidoLogin=false;
    this.intentoFallidoRegistro=false;
  }

  ngOnInit() {
    if (!this.usuarioLogin.logueado) {
      this.router.navigate(['']);
    }
  }

  login() {
    this.usuarioService.login(this.emailFormLogin.value, this.contrasenaFormLogin.value).subscribe(
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

          window.sessionStorage.setItem('emailLogin', this.usuarioLogin.email);
          window.sessionStorage.setItem('pass', this.usuarioLogin.pass);

          this.router.navigate(['/menu-directora']);
          $('#modalLoginForm').modal('toggle');
        } else {
          this.intentoFallidoLogin=true;
          this.usuarioLogin.email = '';
          this.usuarioLogin.pass = '';
          console.log("MMMMM");
        }

      },
      error => {
        this.intentoFallidoLogin=true;
      })
    ;
  }

  registrar() {
    this.usuarioRegistro.nombre= this.nombreRegistro.value;
    this.usuarioRegistro.apellidos = this.apellidosRegistro.value;
    this.usuarioRegistro.email = this.emailRegistro.value;
    this.usuarioRegistro.f_nac = this.fechaRegistro.value;
    this.usuarioRegistro.dni = this.dniRegistro.value;
    this.usuarioRegistro.pass = this.contrasenaRegistro.value;
    this.usuarioRegistro.rol=3;
    this.usuarioService.registrar(this.usuarioRegistro).subscribe(
      result => {
        console.log(result);
        if (result === true) {
          this.router.navigate(['/menu-directora']);
          $('#modalRegisterForm').modal('toggle');
        } else {

          this.usuarioLogin.email = '';
          this.usuarioLogin.pass = '';
        }

      },
      error => {
        this.msgError = error.error;
        this.intentoFallidoRegistro=true;
      })
    ;
  }

  exit() {
    this.usuarioLogin.logueado = false;
    window.sessionStorage.clear();
    this.router.navigate(['']);
  }
  get diagnostic() { return JSON.stringify(this.usuarioRegistro); }


  resetearIntento() {
    this.intentoFallidoLogin=false;
    this.intentoFallidoRegistro=false;
    console.log(this.intentoFallidoLogin);

  }

  get emailFormLogin(){
    return this.FormularioLogin.get('emailLogin');
  }

  get contrasenaFormLogin(){
    return this.FormularioLogin.get('contrasenaLogin');
  }

  get dniRegistro(){
    return this.FormularioRegistro.get('dniRegistro');
  }
  get nombreRegistro(){
    return this.FormularioRegistro.get('nombreRegistro');
  }

  get apellidosRegistro(){
    return this.FormularioRegistro.get('apellidosRegistro');
  }

  get fechaRegistro(){
    return this.FormularioRegistro.get('fNacRegistro');
  }

  get emailRegistro(){
    return this.FormularioRegistro.get('emailRegistro');
  }

  get contrasenaRegistro(){
    return this.FormularioRegistro.get('contrasenaRegistro');
  }

   validarDni(value): boolean{

    var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    var str = value.toString().toUpperCase();

    if (!nifRexp.test(str)) return false;

    var nie = str
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

    var letter = str.substr(-1);
    var charIndex = parseInt(nie.substr(0, 8)) % 23;
    return validChars.charAt(charIndex) === letter;


  }

}
