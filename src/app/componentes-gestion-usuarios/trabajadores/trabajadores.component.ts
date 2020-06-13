import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Usuario} from '../../models/usuario';
import {UsuarioService} from '../../servicios/usuario.service';
import {Router} from '@angular/router';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material';
import {DatosUsuarioService} from '../../servicios/datos-usuario.service';
import {DialogoConfirmacionComponent} from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import {pipeCargo} from '../../pippes/pipeCargo';

/**
 * Componente que permite gestionar los trabajadores de la residencia.
 */
@Component({
  selector: 'tabla-trabajadores',
  styleUrls: ['trabajadores.component.css'],
  templateUrl: 'trabajadores.component.html',
})
export class TrabajadoresComponent implements OnInit{
  /**
   * Dialogo de confirmación de borrado.
   */
  dialogRef: MatDialogRef<DialogoConfirmacionComponent>;
  /**
   * Columnas que se van a mostrar en la tabla.
   */
  displayedColumns: string[] = ['Nombre', 'Apellidos', 'Cargo', 'Acciones'];
  /**
   * Array de trabajadores
   */
  trabajadores : Array<Usuario>;
  /**
   * Datos que contiene la tabla, es decir un array de trabajadores.
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
   * pipeCargo: Pipe que permite transformar un entero en un cargo ej: 0 -> Directora, 1-> Secretaria...
   * usuarioService: Servicio empleado para obtener los trabajadores del sistema.
   * datosUsuario: Servicio empleado para pasar los datos del trabajador al componente de edición.
   * router: Empleado para navegar entre componentes.
   * dialog: Empleado para mostrar el dialogo de confirmación de borrado.
   * @param pipeCargo
   * @param usuarioService
   * @param datosUsuario
   * @param router
   * @param dialog
   */
  constructor(public pipeCargo: pipeCargo,private usuarioService:UsuarioService,private datosUsuario :DatosUsuarioService,public router: Router,public dialog: MatDialog) {
    this.trabajadores = new Array<Usuario>();
  }

  /**
   * Permite abrir el dialogo de confirmación de borrado, recibe como paremetro el usuario que vamos a borrar, y en
   * caso de confirmar, se llama al metodo eliminarTrabajador.
   * @param usuario
   */
  openConfirmationDialog(usuario:Usuario) {
    this.dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Estas seguro de que quieres eliminar a "+usuario.nombre+" "+usuario.apellidos;

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.eliminarTrabajador(usuario);
      }
      this.dialogRef = null;
    });
  }

  /**
   * Cuando se inicia el componente se obtiene el array de trabajadores y se pasan los datos a la tabla.
   */
  ngOnInit(): void {
    this.usuarioService.getTrabajadores().subscribe(
      result => {
        for (let trabajador of result){
          this.trabajadores.push(trabajador);
        }

        this.dataSource = new MatTableDataSource(this.trabajadores);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  /**
   * Permite eliminar un trabajador del sistema.
   * @param trabajador
   */
  eliminarTrabajador(trabajador: Usuario){
    let email = trabajador.email;
    this.usuarioService.eliminarTrabajador(email).subscribe((respuesta)=>{
      if(respuesta==true || respuesta=="true"){
        this.trabajadores.splice(0,this.trabajadores.length);
        this.ngOnInit();
      }
    });
  }


  /**
   * Se almacena el usuario que queremos modificar en el servicio datosUsuario, y se navega al componente
   * de edicción donde posteriormente se recuperan.
   * @param trabajador
   */
  irAEditarTrabajador(trabajador: Usuario): void{
    console.log(trabajador);
    this.datosUsuario.cambiarUsuario(trabajador);
    console.log(this.datosUsuario.usuario);
    this.router.navigate(['modificar-trabajador']);
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

