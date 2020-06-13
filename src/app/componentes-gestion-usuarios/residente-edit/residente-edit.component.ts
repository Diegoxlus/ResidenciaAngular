import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioService} from '../../servicios/usuario.service';
import {Usuario} from '../../models/usuario';
import {DatosUsuarioService} from '../../servicios/datos-usuario.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';

/**
 * Componente que permite editar un residente.
 */

@Component({
  selector: 'app-residente-edit',
  templateUrl: './residente-edit.component.html',
  styleUrls: ['./residente-edit.component.css'],
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
export class ResidenteEditComponent implements OnInit {
  /**
   * Usuario que vamos a editar
   */
  residente: Usuario;
  /**
   * Roles del sistema
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
   * Variable que contiene el mensaje de error que devuelve la API REST.
   */
  msgError: string;
  /**
   * FormGroup que contiene los requisitios que tiene que cumplir el formulario, es decir es empleado
   * para validar los campos del formulario y acceder a estos.
   */
  public FormularioEdit = new FormGroup({
    nombreEdit: new FormControl('', [
      Validators.required,
      Validators.pattern("^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\']+[\\s]{0,1})+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])+[\\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])?$")]),
    apellidosEdit: new FormControl('', [
      Validators.required,
      Validators.pattern("^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\']+[\\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])+[\\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\\'])?$")]),
    dniEdit: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]{8,8}[A-Za-z]$")]),
    emailEdit: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")]),
    fNacEdit: new FormControl('', [
      Validators.required,
    ]),
    contrasenaEdit: new FormControl('',[
        Validators.pattern("^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$"),

      ]
    ),
    rolEdit: new FormControl('',[
        Validators.required
      ]
    )
  });

  /**
   * Constructor del componente, se instancia:
   * datos: Contiene los datos del usuario que se selecciono en el componente residentes para editar.
   * usuarioService: Permite counicarnos con la API REST para editar el residente.
   * router: Permite navegar entre componentes.
   * @param datos
   * @param usuarioService
   * @param router
   */

  constructor(private datos: DatosUsuarioService,private usuarioService: UsuarioService ,public router: Router){
    this.residente = new Usuario(this.datos.usuario.nombre,this.datos.usuario.apellidos,this.datos.usuario.email,'',this.datos.usuario.dni,this.datos.usuario.f_nac,this.datos.usuario.rol);
  }

  /**
   * Al iniciar el componente pasamos los valores del servicio que contiene los datos al formulario.
   */
  ngOnInit() {

    this.pasarValoresFormulario();


  }

  /**
   * Permite modificar el residente del sistema.
   */
  modificarResidente() {
    this.pasarValoresAlUsuario();
    this.usuarioService.modificarResidente(this.residente).subscribe(data=>{
      if(data==true){
      this.registroIncorrecto=false;
      this.registroCorrecto=true;
      }
    },error =>{
      this.registroCorrecto = false;
      this.registroIncorrecto = true;
      this.msgError = error.error;

      }
    );
  }

  /**
   * Permite obtener el campo nombre del formulario
   */
  get nombreEdit(){
    return this.FormularioEdit.get('nombreEdit');
  }
  /**
   * Permite obtener el campo apellidos del formulario
   */
  get apellidosEdit(){
    return this.FormularioEdit.get('apellidosEdit');
  }
  /**
   * Permite obtener el campo fecha del formulario
   */
  get fechaEdit(){
    return this.FormularioEdit.get('fNacEdit');
  }
  /**
   * Permite obtener el campo DNI del formulario
   */
  get dniEdit(){
    return this.FormularioEdit.get('dniEdit');
  }
  /**
   * Permite obtener el campo contraseña del formulario
   */
  get contrasenaEdit(){
    return this.FormularioEdit.get('contrasenaEdit');
  }
  /**
   * Permite obtener el campo email del formulario
   */
  get emailEdit(){
    return this.FormularioEdit.get('emailEdit');
  }
  /**
   * Permite obtener el campo rol del formulario
   */
  get rolEdit(){
    return this.FormularioEdit.get('rolEdit');
  }

  /**
   * Permite validar si la letra del DNI es correcta.
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
   * Permite pasar los valores del residente al formulario. Útil cuando se crea el componente.
   */
  private pasarValoresFormulario() {
    this.nombreEdit.setValue(this.residente.nombre);
    this.apellidosEdit.setValue(this.residente.apellidos);
    this.dniEdit.setValue(this.residente.dni);
    this.fechaEdit.setValue(this.residente.f_nac);
    this.emailEdit.setValue(this.residente.email);
    this.rolEdit.setValue(this.residente.rol);
  }

  /**
   * Permite pasar los valores del formulario al residente, útil cuando se quiere enviar para modificar.
   */
  private pasarValoresAlUsuario() {
    this.residente.nombre = this.nombreEdit.value;
    this.residente.apellidos = this.apellidosEdit.value;
    this.residente.dni = this.dniEdit.value;
    this.residente.f_nac = this.fechaEdit.value;
    this.residente.rol = this.rolEdit.value;
  }

  /**
   * Permite resetear los mensajes del formulario, establecion los valores de registro a false.
   */
  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }
}
