import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import {Usuario} from '../../models/usuario';
import {faInfoCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Habitacion} from '../../models/habitacion';
import {HabitacionService} from '../../servicios/habitacion.service';
import {DatosHabitacionService} from '../../servicios/datos-habitacion.service';


@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent implements OnInit {

  dialogRef: MatDialogRef<DialogoConfirmacionComponent>;
  displayedColumns: string[] = ['Numero', 'Tipo', 'Residente/s', 'Acciones'];
  habitaciones : Array<Habitacion>;
  dataSource : any;
  detalles = faInfoCircle;
  eliminar = faTrashAlt;

  constructor(private habitacionService:HabitacionService,private router: Router,public dialog: MatDialog, private datosHabitacion: DatosHabitacionService ) {
    this.habitaciones = new Array<Habitacion>();
  }

  openConfirmationDialog(habitacion:Habitacion) {
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

  ngOnInit(): void {
    this.habitacionService.getHabitaciones().subscribe(
      result => {
        for (let habitacion of result){
          this.habitaciones.push(new Habitacion(habitacion.numero,habitacion.tipo,habitacion.residente1,habitacion.residente2,habitacion.disponible));
          //this.habitaciones.push(result);

        }
        console.log(this.habitaciones);
        this.dataSource = new MatTableDataSource(this.habitaciones);

      },
      error => {
        console.log(<any>error);
      }
    );
  }

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

  irAEditarHabitacion(habitacion: Habitacion): void{
    this.datosHabitacion.cambiarHabitacion(habitacion);
    this.router.navigate(['modificar-habitacion']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
