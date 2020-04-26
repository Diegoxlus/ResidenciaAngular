import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {faInfoCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {AsistenciaService} from '../servicios/asistencia.service';
import {Asistencia} from '../models/asistencia';
import {Usuario} from '../models/usuario';
import {DialogoConfirmacionComponent} from '../dialogo-confirmacion/dialogo-confirmacion.component';
import {DialogoInformativoComponent} from '../dialogo-informativo/dialogo-informativo.component';



@Component({
  selector: 'app-lista-anotarse-comida',
  templateUrl: './lista-anotarse-comida.component.html',
  styleUrls: ['./lista-anotarse-comida.component.css']
})
export class ListaAnotarseComidaComponent implements OnInit {

  displayedColumns: string[] = ['Dia', 'Comida', 'Cena', 'Anotarse'];
  asistencia : Array<Asistencia>;
  dataSource : MatTableDataSource<Asistencia>;
  dialogRef: MatDialogRef<DialogoInformativoComponent>;
  detalles = faInfoCircle;
  eliminar = faTrashAlt;

  constructor(private asistenciaService:AsistenciaService,private router: Router,public dialog: MatDialog) {
    this.asistencia = new Array<Asistencia>();
    this.dataSource = new MatTableDataSource<Asistencia>();
  }


  ngOnInit(): void {
    this.asistenciaService.getAsistenciaUsuario().subscribe(
      asistencias => {
        for (let asistencia of asistencias){
          this.asistencia.push(new Asistencia('',asistencia.dia,asistencia.come,asistencia.cena,'','',asistencia.menu_comida,asistencia.menu_cena))
        }
        this.dataSource.data = this.asistencia;
      }
    )
  }

  inscribirseComida(dia): void{
    this.asistenciaService.inscribirseComida(dia).subscribe(
      result =>{
        if(result == true){
          this.refresh();
        }
      }
      ,error =>{
        this.abrirDialogoInformarivo(error.error)

      }
    )

  }
  inscribirseCena(dia):void{
    this.asistenciaService.inscribirseCena(dia).subscribe(
      result =>{
        if(result == true){
          this.refresh();
        }
      }
      ,error =>{
        this.abrirDialogoInformarivo(error.error)
      }
    )
  }
  desinscribirseComida(dia): void{
    this.asistenciaService.desinscribirseComida(dia).subscribe(
      result =>{
        if(result == true){
          this.refresh();
        }
      }
      ,error =>{
        this.abrirDialogoInformarivo(error.error)

      }
    )

  }
  desinscribirseCena(dia):void{
    this.asistenciaService.desinscribirseCena(dia).subscribe(
      result =>{
        if(result == true){
          this.refresh();
        }
      }
      ,error =>{
        this.abrirDialogoInformarivo(error.error)

      }
    )
  }

  refresh() {
    this.asistencia = [];
    this.asistenciaService.getAsistenciaUsuario().subscribe(
      asistencias => {
        for (let asistencia of asistencias){
          this.asistencia.push(new Asistencia('',asistencia.dia,asistencia.come,asistencia.cena,'','',asistencia.menu_comida,asistencia.menu_cena))
        }
        this.dataSource.data = this.asistencia;
      }
    )
    }

  abrirDialogoInformarivo(mensaje) {
    this.dialogRef = this.dialog.open(DialogoInformativoComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.mensage = mensaje;

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
