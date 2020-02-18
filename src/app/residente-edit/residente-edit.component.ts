import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioService} from '../servicios/usuario.service';
import {Usuario} from '../models/usuario.model';
import {DatosUsuarioService} from '../servicios/datos-usuario.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-residente-edit',
  templateUrl: './residente-edit.component.html',
  styleUrls: ['./residente-edit.component.css'],

})
export class ResidenteEditComponent implements OnInit {
  residente: Usuario;
  roles = ['Director/a','Secretario/a', 'Cocinero/a', 'Residente/a'];

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
        Validators.minLength(6),
        Validators.maxLength(16),
        Validators.required
      ]
    )
  });

  constructor(private datos: DatosUsuarioService,private usuarioService: UsuarioService ,private router: Router){
    this.residente = new Usuario(this.datos.usuario.nombre,this.datos.usuario.apellidos,this.datos.usuario.email,'',this.datos.usuario.dni,this.datos.usuario.f_nac,this.datos.usuario.rol);
  }


  ngOnInit() {

    console.log(this.residente);
    this.pasarValoresFormulario();


  }


  modificarResidente() {
    this.usuarioService.modificarResidente(this.residente).subscribe(data=>{
      console.log(data);
    });
  }

  onSubmit() {
    console.log(this.residente);
  }

  get nombreEdit(){
    return this.FormularioEdit.get('nombreEdit');
  }
  get apellidosEdit(){
    return this.FormularioEdit.get('apellidosEdit');
  }
  get fechaEdit(){
    return this.FormularioEdit.get('fechaEdit');
  }

  get dniEdit(){
    return this.FormularioEdit.get('dniEdit');
  }

  get contrasenaEdit(){
    return this.FormularioEdit.get('contrasenaEdit');
  }

  get emailEdit(){
    return this.FormularioEdit.get('emailEdit');
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
    this.nombreEdit.setValue(this.)
    this.apellidosEdit.setValue()
    this.dniEdit.setValue()
    this.fechaEdit.setValue()
    this.emailEdit.setValue()
  }
}
