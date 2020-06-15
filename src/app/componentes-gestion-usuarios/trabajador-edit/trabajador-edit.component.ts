import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../models/usuario';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatosUsuarioService} from '../../servicios/datos-usuario.service';
import {UsuarioService} from '../../servicios/usuario.service';
import {Router} from '@angular/router';

/**
 * Componente que permite editar un trabajador.
 */

@Component({
  selector: 'app-trabajador-edit',
  templateUrl: './trabajador-edit.component.html',
  styleUrls: ['./trabajador-edit.component.css']
})
export class TrabajadorEditComponent implements OnInit {
  /**
   * Trabajador que se va a editar.
   */
  trabajador: Usuario;
  /**
   * Array de roles que existen en el sistema y que se muestran en el datepicker.
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
   * datos: Servicio que contiene los datos del trabajador que queremos editar.
   * usuarioService: Servicio para poder modificar el trabajador.
   * router: Permite navegar entre componentes.
   * @param datos
   * @param usuarioService
   * @param router
   */
  constructor(private datos: DatosUsuarioService,private usuarioService: UsuarioService ,public router: Router){
    this.trabajador = new Usuario(this.datos.usuario.nombre,this.datos.usuario.apellidos,this.datos.usuario.email,'',this.datos.usuario.dni,this.datos.usuario.f_nac,this.datos.usuario.rol);
  }

  /**
   * Al crear el componente pasamos los datos del trabajador que tiene el servicio al formulario.
   */
  ngOnInit() {
    this.pasarValoresFormulario();
  }

  /**
   * Permite podificar al trabajador, gracias al usuarioService que tiene el metodo modificarTrabajador que
   * recibe como parametro al trabajador con los campos modificados, excepto el email.
   */
  modificarTrabajador() {
    this.pasarValoresAlUsuario();
    this.usuarioService.modificarTrabajador(this.trabajador).subscribe(data=>{
        if(data==true){
          this.registroCorrecto=true;
        }
      },error =>{
        this.registroIncorrecto = true;
        this.msgError = error.error;

      }
    );
  }

  /**
   * Contiene el valor del campo nombre.
   */
  get nombreEdit(){
    return this.FormularioEdit.get('nombreEdit');
  }
  /**
   * Contiene el valor del campo apellidos.
   */
  get apellidosEdit(){
    return this.FormularioEdit.get('apellidosEdit');
  }
  /**
   * Contiene el valor del campo fecha.
   */
  get fechaEdit(){
    return this.FormularioEdit.get('fNacEdit');
  }
  /**
   * Contiene el valor del campo DNI.
   */
  get dniEdit(){
    return this.FormularioEdit.get('dniEdit');
  }

  /**
   * Contiene el valor del campo contraseña.
   */
  get contrasenaEdit(){
    return this.FormularioEdit.get('contrasenaEdit');
  }

  /**
   * Contiene el valor del campo email.
   */
  get emailEdit(){
    return this.FormularioEdit.get('emailEdit');
  }

  /**
   * Contiene el valor del campo rol.
   */
  get rolEdit(){
    return this.FormularioEdit.get('rolEdit');
  }

  /**
   * Función que permite validar si la letra del DNI es correcta
   */
  validarDni(value): boolean{

    if(value==undefined || value== null){
      return false;
    }

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
   * Permite pasar los valores del servicio que contiene los datos al formulario.
   * Este método es llamado cuando se inicia el componente.
   */
  private pasarValoresFormulario() {
    this.nombreEdit.setValue(this.trabajador.nombre);
    this.apellidosEdit.setValue(this.trabajador.apellidos);
    this.dniEdit.setValue(this.trabajador.dni);
    this.fechaEdit.setValue(this.trabajador.f_nac);
    this.emailEdit.setValue(this.trabajador.email);
    this.rolEdit.setValue(this.trabajador.rol);
    (this.trabajador.rol);
  }

  /**
   * Permite pasar los valores del formulario al trabajador que vamos a editar.
   */
  private pasarValoresAlUsuario() {
    this.trabajador.nombre = this.nombreEdit.value;
    this.trabajador.apellidos = this.apellidosEdit.value;
    this.trabajador.dni = this.dniEdit.value;
    this.trabajador.f_nac = this.fechaEdit.value;
    this.trabajador.rol = this.rolEdit.value;
  }

  /**
   * Permite resetear los mensajes del formulario, establecion los valores de registro a false.
   */
  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }
}

