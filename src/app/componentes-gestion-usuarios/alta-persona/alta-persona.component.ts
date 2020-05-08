import { Component} from '@angular/core';
import {Usuario} from '../../models/usuario';
import {UsuarioService} from '../../servicios/usuario.service';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-alta-persona',
  templateUrl: './alta-persona.component.html',
  styleUrls: ['./alta-persona.component.css'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate(2000,style({opacity:1}))
      ]),
      transition(':leave', [
        style({opacity: 0}),
        animate(2000,style({opacity:1}))
      ]),
    ]),
  ],

})
export class AltaPersonaComponent {
  nuevoUsuario: Usuario;
  roles = ['Director/a','Secretario/a', 'Cocinero/a', 'Residente/a', 'Portero/a'];
  registroCorrecto : boolean = false;
  registroIncorrecto : boolean = false;
  msgError: string;

  public FormularioAlta = new FormGroup({
    nombreAlta: new FormControl('', [
      Validators.required,
      Validators.pattern("^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\']+[\\s]{0,1})+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])+[\\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])?$")]),
    apellidosAlta: new FormControl('', [
      Validators.required,
      Validators.pattern("^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\']+[\\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])+[\\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])?$")]),
    dniAlta: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]{8,8}[A-Za-z]$")]),
    emailAlta: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")]),
    fNacAlta: new FormControl('', [
      Validators.required,
    ]),
    contrasenaAlta: new FormControl('',[
      Validators.pattern("^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$"),
      Validators.minLength(6),
      Validators.maxLength(16),
      Validators.required

      ]
    ),
    rolAlta: new FormControl('',[

      ]
    )
  });

  constructor(private usuarioService: UsuarioService ,private router: Router){
    this.nuevoUsuario = new Usuario();
  }


  altaResidente() {
    this.pasarValoresAlUsuario();
    this.usuarioService.registroManual(this.nuevoUsuario).subscribe(data=>{
          this.registroCorrecto=true;
          this.FormularioAlta.reset();

      },error =>{
        this.registroIncorrecto = true;
        this.msgError = error.error;

      }
    );
  }

  onSubmit() {
    console.log(this.nuevoUsuario);
  }

  get nombreAlta(){
    return this.FormularioAlta.get('nombreAlta');
  }
  get apellidosAlta(){
    return this.FormularioAlta.get('apellidosAlta');
  }
  get fechaAlta(){
    return this.FormularioAlta.get('fNacAlta');
  }

  get dniAlta(){
    return this.FormularioAlta.get('dniAlta');
  }

  get contrasenaAlta(){
    return this.FormularioAlta.get('contrasenaAlta');
  }

  get emailAlta(){
    return this.FormularioAlta.get('emailAlta');
  }

  get rolAlta(){
    return this.FormularioAlta.get('rolAlta');
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

  private pasarValoresFormulario() {
    this.nombreAlta.setValue(this.nuevoUsuario.nombre);
    this.apellidosAlta.setValue(this.nuevoUsuario.apellidos);
    this.dniAlta.setValue(this.nuevoUsuario.dni);
    this.fechaAlta.setValue(this.nuevoUsuario.f_nac);
    this.emailAlta.setValue(this.nuevoUsuario.email);
    this.rolAlta.setValue(this.nuevoUsuario.rol);
  }

  private pasarValoresAlUsuario() {

    this.nuevoUsuario.nombre = this.nombreAlta.value;
    this.nuevoUsuario.apellidos = this.apellidosAlta.value;
    this.nuevoUsuario.pass = this.contrasenaAlta.value;
    this.nuevoUsuario.email = this.emailAlta.value;
    this.nuevoUsuario.dni = this.dniAlta.value;
    this.nuevoUsuario.f_nac = this.fechaAlta.value;
    this.nuevoUsuario.rol = this.rolAlta.value;
  }

  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }
}
