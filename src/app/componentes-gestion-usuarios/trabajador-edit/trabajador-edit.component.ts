import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../models/usuario';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatosUsuarioService} from '../../servicios/datos-usuario.service';
import {UsuarioService} from '../../servicios/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trabajador-edit',
  templateUrl: './trabajador-edit.component.html',
  styleUrls: ['./trabajador-edit.component.css']
})
export class TrabajadorEditComponent implements OnInit {
  trabajador: Usuario;
  roles = ['Director/a','Secretario/a', 'Cocinero/a', 'Residente/a'];
  registroCorrecto : boolean = false;
  registroIncorrecto : boolean = false;
  msgError: string;

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

  constructor(private datos: DatosUsuarioService,private usuarioService: UsuarioService ,private router: Router){
    this.trabajador = new Usuario(this.datos.usuario.nombre,this.datos.usuario.apellidos,this.datos.usuario.email,'',this.datos.usuario.dni,this.datos.usuario.f_nac,this.datos.usuario.rol);
  }


  ngOnInit() {

    console.log(this.trabajador);
    this.pasarValoresFormulario();

  }


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

  onSubmit() {
    console.log(this.trabajador);
  }

  get nombreEdit(){
    return this.FormularioEdit.get('nombreEdit');
  }
  get apellidosEdit(){
    return this.FormularioEdit.get('apellidosEdit');
  }
  get fechaEdit(){
    return this.FormularioEdit.get('fNacEdit');
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

  get rolEdit(){
    return this.FormularioEdit.get('rolEdit');
  }

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

  private pasarValoresFormulario() {
    this.nombreEdit.setValue(this.trabajador.nombre);
    this.apellidosEdit.setValue(this.trabajador.apellidos);
    this.dniEdit.setValue(this.trabajador.dni);
    this.fechaEdit.setValue(this.trabajador.f_nac);
    this.emailEdit.setValue(this.trabajador.email);
    this.rolEdit.setValue(this.trabajador.rol);
  }

  private pasarValoresAlUsuario() {
    this.trabajador.nombre = this.nombreEdit.value;
    this.trabajador.apellidos = this.apellidosEdit.value;
    this.trabajador.dni = this.dniEdit.value;
    this.trabajador.f_nac = this.fechaEdit.value;
    this.trabajador.rol = this.rolEdit.value;
  }

  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }
}

