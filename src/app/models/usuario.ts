/**
 * Modelo para instanciar Usuarios los atributos comienzan por _ por convenio, ya que son privados.
 */

export class Usuario {
  /**
   * Contiene el nombre del usuario.
   */
  private _nombre?: string;
  /**
   * Contiene el email del usuario.
   */
  private _email?: string;
  /**
   * Contiene los apellidos del usuario.
   */
  private _apellidos?: string;
  /**
   * Contiene la contraseña del usuario.
   */
  private _pass?: string;
  /**
   * Atributo booleano que indica si el residente está logueado en el sistema o no:
   * false: No está logueado.
   * true: Si está logueado.
   */
  private _logueado?: boolean;
  /**
   * Contiene el dni de usuario.
   */
  private _dni?: string;
  /**
   * Contiene la fecha de nacimiento del usuario.
   */
  private _f_nac?: string;
  /**
   * Contiene el rol del usuario:
   * 0: Directora
   * 1: Secretaria
   * 2: Cocinera
   * 3: Residente
   * 4: Portero
   */
  private _rol?: any;
  /**
   * Contiene el número a la que pertenezca un usuario residente. En caso de que sea un trabajador, este
   * valor no se instanciará.
   */
  private _habitacion?: number;

  /**
   * Todos los parametros son opcionales, asi podemos generar una instancia de la clase Usuario a nuestro gusto,
   * en el caso de que no nos interese algun atributo, basta con no instanciarlo cuando creamos el objeto.
   * @param nombre
   * @param apellidos
   * @param email
   * @param contrasena
   * @param dni
   * @param f_nac
   * @param rol
   * @param habitacion
   */
  constructor(nombre?: string, apellidos?: string, email?: string , contrasena?: string , dni?: string, f_nac?: string , rol?: any, habitacion?:number ) {
    this._nombre = nombre;
    this._email = email;
    this._apellidos = apellidos;
    this._pass = contrasena;
    this._logueado = false;
    this._dni = dni;
    this._f_nac = f_nac;
    this._rol = rol;
    this._habitacion = habitacion;
  }






  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get apellidos(): string {
    return this._apellidos;
  }

  set apellidos(value: string) {
    this._apellidos = value;
  }

  get pass(): string {
    return this._pass;
  }

  set pass(value: string) {
    this._pass = value;
  }

  get logueado(): boolean {
    return this._logueado;
  }

  set logueado(value: boolean) {
    this._logueado = value;
  }

  get dni(): string {
    return this._dni;
  }

  set dni(value: string) {
    this._dni = value;
  }

  get f_nac(): string {
    return this._f_nac;
  }

  set f_nac(value: string) {
    this._f_nac = value;
  }

  get rol(): any {
    return this._rol;
  }

  set rol(value: any) {
    this._rol = value;
  }


  get habitacion(): number {
    return this._habitacion;
  }

  set habitacion(value: number) {
    this._habitacion = value;
  }

  /**
   * Comprueba que un usuario sea valido para enviarlo a la API REST
   */
  public validoParcial(): boolean {
    let correcto: boolean;
    correcto = true;
    if (this._nombre.length < 1 ) { correcto = false; }
    if (this._apellidos.length < 1 ) { correcto = false; }
    if (this._email.length < 1 ) { correcto = false; }
    if (this._pass == undefined || this._pass.length < 1 ) { correcto = false; }
    if (this._rol == undefined) { correcto = false; }
    return correcto;
  }


}
