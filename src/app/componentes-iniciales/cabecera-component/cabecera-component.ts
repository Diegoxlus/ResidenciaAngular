import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../../servicios/usuario.service';
import {Usuario} from '../../models/usuario';
import {Router} from '@angular/router';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import {ConfiguracionService} from '../../servicios/configuracion.service';
import {Configuracion} from '../../models/configuracion';

/**
 * Variable Jquery.
 */
declare var $: any;

/**
 * Componente que controla la cabecera.
 */
@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera-component.html',
  styleUrls: ['./cabecera-component.css']
})
export class CabeceraComponent implements OnInit {
  /**
   * Almacena el usuario que hace login.
   */
  public usuarioLogin: Usuario;
  /**
   * Almacena el usuario que se quiere registrar.
   */
  public usuarioRegistro: Usuario;

  /**
   * Variable booleana, en caso de que el login sea incorrecto se establece a true.
   */
  public intentoFallidoLogin:boolean;

  /**
   * Variable booleana, en caso de que el registro sea incorrecto se establece a true.
   */
  public intentoFallidoRegistro:boolean;
  /**
   * Variable que contiene la configuración del sistema.
   */
  public configuracion : Configuracion;
  /**
   * FormGroup que contiene los requisitios que tiene que cumplir el formulario, es decir es empleado
   * para validar los campos del formulario y acceder a estos.
   */
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
  /**
   * FormGroup que contiene los requisitios que tiene que cumplir el formulario, es decir es empleado
   * para validar los campos del formulario y acceder a estos.
   */
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


  /**
   * Variable que contiene el mensaje de error que devuelve la API REST.
   */
  msgError: String;

  /**
   * Constructor del componente, se instancia:
   * usuarioService: Permite realizar el login y registro conectandose con la API REST.
   * router: Permite navegar entre componentes,
   * configuracionService: Permite obtener la configuración del sistema con la finalidad de saber si
   * está habilitado el registro.
   * @param usuarioService
   * @param router
   * @param configuracionService
   */
  constructor(private usuarioService: UsuarioService, public router: Router, private configuracionService: ConfiguracionService) {
    this.usuarioLogin = new Usuario(null, null, null, null);
    this.usuarioRegistro = new Usuario("", "", null, null,null,null,null);
    this.intentoFallidoLogin=false;
    this.intentoFallidoRegistro=false;
    this.configuracion = new Configuracion();
  }

  /**
   * Al crear el componente obtenemos la configuración del sistema.
   * También se verifica si el usuario no esta logueado, en ese caso se redirecciona al componente inicial.
   */
  ngOnInit() {

    this.configuracionService.getConfiguracion().subscribe(
      result=>{
        this.configuracion = new Configuracion(result.id,result.hora_comida,result.hora_cena,result.limite_hora_comida,result.limite_hora_cena,result.registro)
      },error=>{

      }
    );

    if (!this.usuarioLogin.logueado) {
      this.router.navigate(['']);
    }

  }

  /**
   * Permite que un usuario haga login en el sistema. Si el codigo de respuesta es 200 significa que
   * el el login fue correcto, por lo tanto ya podemos asignar los valores que devuelve la API
   * REST a nuestro usuario.
   * También se guardo el email y la contraseña en el sessionStorage, con la finalidad de enviarlos en
   * peteciones a servicios que requieran autenticación y autorización de rol.
   */
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

          window.sessionStorage.setItem('emailLogin', this.usuarioLogin.email);
          window.sessionStorage.setItem('pass', this.usuarioLogin.pass);
          if(this.usuarioLogin.rol == 0){
            this.router.navigate(['/menu-directora']);
          }
          if(this.usuarioLogin.rol == 1){
            this.router.navigate(['/menu-secretaria']);
          }
          if( this.usuarioLogin.rol == 2){
            this.router.navigate(['/menu-cocinera'])
          }
          if( this.usuarioLogin.rol == 3){
            this.router.navigate(['/menu-residente'])
          }
          if( this.usuarioLogin.rol == 4){
            this.router.navigate(['/menu-portero'])
          }
          $('#modalLoginForm').modal('toggle');
        } else {
          this.intentoFallidoLogin=true;
          this.usuarioLogin.email = '';
          this.usuarioLogin.pass = '';

        }

      },
      error => {
        this.intentoFallidoLogin=true;
      })
    ;
  }

  /**
   * Se registra un usuario en el sistema, si el registro es correcto se guarda el valor en usuarioRegistro y en
   * sessionStorage, con la misma finalidad que con el login.
   * También se redirecciona al menú de Residente.
   */
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

          $('#modalRegisterForm').modal('toggle');
          window.sessionStorage.setItem('emailLogin', this.usuarioRegistro.email);
          window.sessionStorage.setItem('pass', this.usuarioRegistro.pass);
          this.usuarioLogin.logueado=true;
          this.router.navigate(['/menu-residente']);


      },
      error => {

        this.msgError = error.error;
        this.intentoFallidoRegistro=true;
      })
    ;
  }

  /**
   * Metodo que se ejecuta cuando pulsamos en el boton de salir de la cabecera.
   * Limpia todos los datos del usuario en el componente y en el sessionStorage.
   * Realiza una redirección a la página de inicio.
   */
  exit() {
    this.usuarioLogin.logueado = false;
    this.usuarioLogin = new Usuario();
    window.sessionStorage.clear();
    this.ngOnInit();
    this.router.navigate(['']);
  }
  /**
   * Permite resetear los mensajes del formulario, establecion los valores de registro a false.
   */
  resetearIntento() {
    this.intentoFallidoLogin=false;
    this.intentoFallidoRegistro=false;
    console.log(this.intentoFallidoLogin);

  }

  /**
   * Permite obtener el campo email del formulario de login.
   */
  get emailFormLogin(){
    return this.FormularioLogin.get('emailLogin');
  }
  /**
   * Permite obtener el campo contraseña del formulario de login.
   */
  get contrasenaFormLogin(){
    return this.FormularioLogin.get('contrasenaLogin');
  }
  /**
   * Permite obtener el campo DNI del formulario de registro.
   */
  get dniRegistro(){
    return this.FormularioRegistro.get('dniRegistro');
  }
  /**
   * Permite obtener el campo nombre del formulario de registro.
   */
  get nombreRegistro(){
    return this.FormularioRegistro.get('nombreRegistro');
  }
  /**
   * Permite obtener el campo apellidos del formulario de registro.
   */
  get apellidosRegistro(){
    return this.FormularioRegistro.get('apellidosRegistro');
  }
  /**
   * Permite obtener el campo fecha del formulario de registro.
   */
  get fechaRegistro(){
    return this.FormularioRegistro.get('fNacRegistro');
  }
  /**
   * Permite obtener el campo email del formulario de registro.
   */
  get emailRegistro(){
    return this.FormularioRegistro.get('emailRegistro');
  }
  /**
   * Permite obtener el campo contraseña del formulario de registro.
   */
  get contrasenaRegistro(){
    return this.FormularioRegistro.get('contrasenaRegistro');
  }
  /**
   * Permite obtener el campo email del formulario
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
   * Permite cerrar el modal de registro, empleamos selector de JQUERY.
   */
  cerrarModal() {
    $('#modalRegisterForm').modal('toggle');

  }
}
