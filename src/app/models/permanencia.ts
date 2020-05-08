export class Permanencia {
  private _id ?;
  private _residente ?;
  private _dia?;
  private _nombre?;
  private _apellidos?;
  private _habitacion?;


  constructor(id ?, residente ?, dia ?,nombre ?, apellidos ?, habitacion ?) {
    this._id = id;
    this._residente = residente;
    this._dia = dia;
    this._nombre = nombre;
    this._apellidos = apellidos;
    this._habitacion = habitacion
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

  get habitacion() {
    return this._habitacion;
  }

  set habitacion(value) {
    this._habitacion = value;
  }
}
