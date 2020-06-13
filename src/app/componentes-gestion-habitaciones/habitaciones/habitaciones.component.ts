import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import {faInfoCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Habitacion} from '../../models/habitacion';
import {HabitacionService} from '../../servicios/habitacion.service';
import {DatosHabitacionService} from '../../servicios/datos-habitacion.service';

/**
 * Componente que se emplea para mostrar las habitaciones junto con sus opciones.
 */

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent implements OnInit {
  /**
   * Dialogo empleado para confirmar que queremos eliminar una habitación.
   */
  dialogRef: MatDialogRef<DialogoConfirmacionComponent>;
  /**
   * Columnas que va a tener la tabla
   */
  displayedColumns: string[] = ['Numero', 'Tipo', 'Residente/s', 'Acciones'];
  /**
   * Array de habitaciones empleado para almacenar las habitaciones que obtendremos en la API REST.
   */
  habitaciones : Array<Habitacion>;
  /**
   * Variable empleada en la tabla que contendra la lista de habitaciones.
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
   * Constructor de la clase, empleamos los servicios:
   * habitaciónService: Para comunicarnos con la API REST y poder obtener las habitaciones.
   * datosHabitacion: Para enviar la habitación entre componentes, en concreto al edit-habitacion-component.ts
   * El router para navegar entre componentes, y el dialog para mostrar la confirmación al eliminar una habitación.
   * @param habitacionService
   * @param router
   * @param dialog
   * @param datosHabitacion
   */
  constructor(private habitacionService:HabitacionService,public router: Router,public dialog: MatDialog, private datosHabitacion: DatosHabitacionService ) {
    this.habitaciones = new Array<Habitacion>();
  }

  /**
   * Permite arir el dialogo de confirmación de borrado, en caso de pulsar aceptar, llama al metodo
   * eliminarHabitacion al que le pasa la habitacion como parametro.
   * @param habitacion
   */
  openConfirmationDialogE(habitacion:Habitacion) {
    this.dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Estas seguro de que quieres eliminar la habitacion " + habitacion.numero;

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.eliminarHabitacion(habitacion);
      }
      this.dialogRef = null;
    });
  }

  /**
   * Este metodo se inicia al crear el componente, por ello obtenemos las habitaciones de la API REST,
   * posteriormente las metemos en el array de habitaciones y este array se le pasa al constructor de un
   * MatTableDataSource para poder listar las habitaciones en la tabla.
   */
  ngOnInit(): void {
    this.habitacionService.getHabitaciones().subscribe(
      result => {
        for (let habitacion of result){
          this.habitaciones.push(new Habitacion(habitacion.numero,habitacion.tipo,habitacion.residente1,habitacion.residente2,habitacion.disponible));
        }
        console.log(this.habitaciones);
        this.dataSource = new MatTableDataSource(this.habitaciones);

      },
      error => {
        console.log(<any>error);
      }
    );
  }

  /**
   * Método que permite eliminar una habitación del sistema.
   * Se le pasa la habitación y despues el número de la habitación al servicio, ya que es lo que necesita.
   * Si se elimina correctamente se vacia el array de habitaciones y se vuelve a ejecutar el ngOnInit para
   * cargar otra vex las habitaciones.
   * @param habitacion
   */
  eliminarHabitacion(habitacion: Habitacion){
    let numero = habitacion.numero;
    this.habitacionService.eliminarHabitacion(numero).subscribe((respuesta)=>{
      if(respuesta==true){
        this.habitaciones.splice(0,this.habitaciones.length);
        this.ngOnInit();
      }
    },error => {

    });
  }

  /**
   * Navega al componente edit-habitacion.component.ts, antes de eso modifica la habitacion que está
   * almacenada en el servicio, para recuperarla posteriormente en el componente de editar.
   * @param habitacion
   */
  irAEditarHabitacion(habitacion: Habitacion): void{
    this.datosHabitacion.cambiarHabitacion(habitacion);
    this.router.navigate(['modificar-habitacion']);
  }

  /**
   * Aplica el filtro para poder buscar por todos los campos de la tabla.
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
