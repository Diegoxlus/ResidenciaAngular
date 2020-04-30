export class Parte {
  private _id ?;
  private _residente ?;
  private _gravedad ?;
  private _motivo ? ;
  private _nombreResidente ?;
  private _apellidosResidente ?;


  constructor(id ?, residente ?, gravedad ?, motivo ?,nombreResidente ?, apellidosResidente ?) {
    this._id = id;
    this._residente = residente;
    this._gravedad = gravedad;
    this._motivo = motivo;
    this._nombreResidente = nombreResidente;
    this._apellidosResidente = apellidosResidente;
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

  get gravedad() {
    return this._gravedad;
  }

  set gravedad(value) {
    this._gravedad = value;
  }

  get motivo() {
    return this._motivo;
  }

  set motivo(value) {
    this._motivo = value;
  }

  get nombreResidente() {
    return this._nombreResidente;
  }

  set nombreResidente(value) {
    this._nombreResidente = value;
  }

  get apellidosResidente() {
    return this._apellidosResidente;
  }

  set apellidosResidente(value) {
    this._apellidosResidente = value;
  }
}
