import { Component} from '@angular/core';
import {Usuario} from '../../models/usuario';
import {UsuarioService} from '../../servicios/usuario.service';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';

/**
 * Componente empleado para dar de alta una usuario en el sistema.
 */
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
  /**
   * Nuevo usuario que se va añadir al sistema.
   */
  nuevoUsuario: Usuario;
  /**
   * Array de roles del sistema. Empleados en el select.
   */
  roles = ['Director/a','Secretario/a', 'Cocinero/a', 'Residente/a', 'Portero/a'];

  /**
   * Variable booleana, en caso de que el registro sea correcto se establece a true.
   */
  registroCorrecto : boolean = false;

  /**
   * Variable booleana, en caso de que el registro sea incorrecto se establece a true.
   */
  registroIncorrecto : boolean = false;
  /**
   * Mensaje de error que se muestra cuando sea necesario en la vista.
   */
  msgError: string;

  /**
   * FormGroup que contiene los requisitios que tiene que cumplir el formulario, es decir es empleado
   * para validar los campos del formulario y acceder a estos.
   */
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

  /**
   * Constructor del componente, se instancia:
   * usuarioService: Para poder comunicarnos con la API REST y realizar el alta del usuario.
   * router: Para poder navegar entra páginas.
   * @param usuarioService
   * @param router
   */
  constructor(private usuarioService: UsuarioService ,public router: Router){
    this.nuevoUsuario = new Usuario();
  }

  /**
   * Permite dar de alta un residente en el sistema.
   */
  altaPersonal() {
    this.pasarValoresAlUsuario();
    this.usuarioService.registroManual(this.nuevoUsuario).subscribe(data=>{
      this.registroIncorrecto = false;
      this.registroCorrecto=true;
          this.FormularioAlta.reset();
          this.rolAlta.setValue(this.nuevoUsuario.rol);

      },error =>{
        this.registroIncorrecto = true;
        this.msgError = error.error;

      }
    );
  }


  /**
   * Permite acceder al campo nombre del formulario.
   */
  get nombreAlta(){
    return this.FormularioAlta.get('nombreAlta');
  }
  /**
   * Permite acceder al campo apellidos del formulario.
   */
  get apellidosAlta(){
    return this.FormularioAlta.get('apellidosAlta');
  }
  /**
   * Permite acceder al campo fecha del formulario.
   */
  get fechaAlta(){
    return this.FormularioAlta.get('fNacAlta');
  }
  /**
   * Permite acceder al campo dni del formulario.
   */
  get dniAlta(){
    return this.FormularioAlta.get('dniAlta');
  }
  /**
   * Permite acceder al campo contraseña del formulario.
   */
  get contrasenaAlta(){
    return this.FormularioAlta.get('contrasenaAlta');
  }

  /**
   * Permite acceder al campo email del formulario.
   */
  get emailAlta(){
    return this.FormularioAlta.get('emailAlta');
  }

  /**
   * Permite acceder al campo rol del formulario.
   */
  get rolAlta(){
    return this.FormularioAlta.get('rolAlta');
  }

  /**
   * Metodo que verifica si la letra del DNI es correcta.
   * @param value
   */
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

  /**
   * Este método permite pasar los valores del formulario al nuestro usuario.
   */
  private pasarValoresAlUsuario() {

    this.nuevoUsuario.nombre = this.nombreAlta.value;
    this.nuevoUsuario.apellidos = this.apellidosAlta.value;
    this.nuevoUsuario.pass = this.contrasenaAlta.value;
    this.nuevoUsuario.email = this.emailAlta.value;
    this.nuevoUsuario.dni = this.dniAlta.value;
    this.nuevoUsuario.f_nac = this.fechaAlta.value;
    this.nuevoUsuario.rol = this.rolAlta.value;
  }
  /**
   * Permite resetear los mensajes del formulario, establecion los valores de registro a false.
   */
  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }
}
