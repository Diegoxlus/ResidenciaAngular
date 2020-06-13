import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../models/usuario';
import {faInfoCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from '../../servicios/usuario.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import {DatosUsuarioService} from '../../servicios/datos-usuario.service';

/**
 * Componente que permite gestionar los residentes de la residencia.
 */

@Component({
  selector: 'tabla-residentes',
  templateUrl: './residentes.component.html',
  styleUrls: ['./residentes.component.css'],
})
export class ResidentesComponent implements OnInit {
  /**
   * Dialogo de confirmación de borrado.
   */
  dialogRef: MatDialogRef<DialogoConfirmacionComponent>;
  /**
   * Columnas que se van a mostrar en la tabla.
   */
  displayedColumns: string[] = ['Nombre', 'Apellidos', 'Habitacion', 'Acciones'];
  /**
   * Array de residentes
   */
  residentes : Array<Usuario>;
  /**
   * Datos que contiene la tabla, es decir un array de residentes.
   */
  dataSource : any;
  /**
   * Icono de detalles.
   */
  detalles = faInfoCircle;
  /**
   * Icono de eliminar.
   */
  eliminar = faTrashAlt;

  /**
   * Constructor del componente, instancias:
   * usuarioService: Servicio empleado para obtener los residentes del sistema.
   * datosUsuario: Servicio empleado para pasar los datos del residente al componente de edición.
   * router: Empleado para navegar entre componentes.
   * dialog: Empleado para mostrar el dialogo de confirmación de borrado.
   * @param usuarioService
   * @param router
   * @param dialog
   * @param datosUsuario
   */
  constructor(private usuarioService:UsuarioService,private router: Router,public dialog: MatDialog, private datosUsuario: DatosUsuarioService ) {
    this.residentes = new Array<Usuario>();
  }

  /**
   * Permite abrir el dialogo de confirmación de borrado, recibe como paremetro el usuario que vamos a borrar, y en
   * caso de confirmar, se llama al metodo eliminarResidente.
   * @param usuario
   */
  openConfirmationDialog(usuario:Usuario) {
    this.dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Estas seguro de que quieres eliminar a "+usuario.nombre+" "+usuario.apellidos;

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.eliminarResidente(usuario);
      }
      this.dialogRef = null;
    });
  }

  /**
   * Cuando se inicia el componente se obtiene el array de residentes y se pasan los datos a la tabla.
   */
  ngOnInit(): void {
    this.usuarioService.getResidentesHabitacion().subscribe(
      result => {
        console.log(result);
        for (let residente of result){
          this.residentes.push(residente);
        }

        this.dataSource = new MatTableDataSource(this.residentes);
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  /**
   * Permite eliminar un residente del sistema.
   * @param residente
   */
  eliminarResidente(residente: Usuario){
    let email = residente.email;
    this.usuarioService.eliminarResidente(email).subscribe((respuesta)=>{
      if(respuesta==true || respuesta=="true"){
        this.residentes.splice(0,this.residentes.length);
        this.ngOnInit();
      }
    });
  }

  /**
   * Se almacena el usuario que queremos modificar en el servicio datosUsuario, y se navega al componente
   * de edicción donde posteriormente se recuperan.
   * @param residente
   */
  irAEditarResidente(residente: Usuario): void{
    console.log(residente);
    this.datosUsuario.cambiarUsuario(residente);
    console.log(this.datosUsuario.usuario);
    this.router.navigate(['modificar-residente']);
  }
  /**
   * Filtro empleado para buscar por todos los campos de la tabla.
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
