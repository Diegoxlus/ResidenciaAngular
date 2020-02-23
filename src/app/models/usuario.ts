import {Optional} from '@angular/core';

export class Usuario {
  private _nombre?: string;
  private _email?: string;
  private _apellidos?: string;
  private _pass?: string;
  private _logueado?: boolean;
  private _dni?: string;
  private _f_nac?: string;
  private _rol?: any;
  private _habitacion?: number;


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
