export class Pago {
  private _id ?;
  private _residente?;
  private _dia?;
  private _extension?;
  private _mes?;
  private _correcto?;
  private _nombre?;
  private _apellidos?;


  constructor(id, residente, dia, extension, mes, correcto,nombre,apellidos) {
    this._id = id;
    this._residente = residente;
    this._dia = dia;
    this._extension = extension;
    this._mes = mes;
    this._correcto = correcto;
    this._nombre = nombre;
    this._apellidos = apellidos;
  }


  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get residente() {
    return this._residente;
  }

  set residente(value) {
    this._residente = value;
  }

  get dia() {
    return this._dia;
  }

  set dia(value) {
    this._dia = value;
  }

  get extension() {
    return this._extension;
  }

  set extension(value) {
    this._extension = value;
  }

  get mes() {
    return this._mes;
  }

  set mes(value) {
    this._mes = value;
  }

  get correcto() {
    return this._correcto;
  }

  set correcto(value) {
    this._correcto = value;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(value) {
    this._nombre = value;
  }

  get apellidos() {
    return this._apellidos;
  }

  set apellidos(value) {
    this._apellidos = value;
  }
}
