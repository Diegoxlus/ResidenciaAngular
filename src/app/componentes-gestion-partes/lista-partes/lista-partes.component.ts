import { Component, OnInit } from '@angular/core';
import {Partes} from '../../models/partes';
import {MatDialog, MatDialogRef, MatTableDataSource, PageEvent} from '@angular/material';
import {DialogoInformativoComponent} from '../../dialogo-informativo/dialogo-informativo.component';
import {faInfoCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {AsistenciaService} from '../../servicios/asistencia.service';
import {Router} from '@angular/router';
import {ParteService} from '../../servicios/parte.service';
import {Parte} from '../../models/parte';
import {Overlay} from '@angular/cdk/overlay';
import {DatosParteService} from '../../servicios/datos-parte.service';
import {Habitacion} from '../../models/habitacion';
import {DialogoConfirmacionComponent} from '../../dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-lista-partes',
  templateUrl: './lista-partes.component.html',
  styleUrls: ['./lista-partes.component.css']
})
export class ListaPartesComponent implements OnInit {

  displayedColumns: string[] = ['Residente', 'Gravedad',"Acciones"];
  partes : Array<Parte>;
  dataSource : MatTableDataSource<Parte>;
  dialogRef: MatDialogRef<DialogoInformativoComponent>;
  dialogRef2: any ;
  detalles = faInfoCircle;
  eliminar = faTrashAlt;

  constructor(private parteService:ParteService,private datosParteService: DatosParteService,private router: Router,public dialog: MatDialog) {
    this.partes = new Array<Parte>();
    this.dataSource = new MatTableDataSource<Parte>();
  }


  ngOnInit(): void {
    this.parteService.getPartes().subscribe(
      partes => {
        for (let parte of partes){
          this.partes.push(new Parte(parte.id,parte.residente,parte.titulo,parte.descripcion,parte.nombre,parte.apellidos));
        }
        this.dataSource.data = this.partes;
        console.log(partes);
      }
    )
  }


  refresh() {
    this.partes = [];
    this.parteService.getPartes().subscribe(
      partes => {
        for (let parte of partes){
          this.partes.push(new Parte(parte.id,parte.residente,parte.titulo,parte.descripcion,parte.nombre,parte.apellidos));
        }
        this.dataSource.data = this.partes;
      }
    )
  }

  abrirDialogoInformarivo(parte) {
    this.dialogRef = this.dialog.open(DialogoInformativoComponent, {
      disableClose: false,

    });
    this.dialogRef.componentInstance.mensage = parte.descripcion;

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }

  abrirDialogoInfoError(error) {
    this.dialogRef = this.dialog.open(DialogoInformativoComponent, {
      disableClose: false,

    });
    this.dialogRef.componentInstance.mensage = error;

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }

  openConfirmationDialogE(parte: Parte) {
    this.dialogRef2 = this.dialog.open(DialogoConfirmacionComponent, {
      disableClose: false
    });
    this.dialogRef2.componentInstance.confirmMessage = "Estas seguro de que quieres eliminar el noticia?";

    this.dialogRef2.afterClosed().subscribe(result => {
      if(result) {
        this.eliminarParte(parte);
      }
      this.dialogRef2 = null;
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  editarParte(parte: Parte) {
    this.datosParteService.cambiarParte(parte);
    this.router.navigate(['/editar-noticia']);

  }

  eliminarParte(parte: Parte) {
    let id = parte.id;
    this.parteService.eliminarParte(id).subscribe(
      response =>{
        if(response==true){
          this.refresh();
        }
      },error =>{
        this.abrirDialogoInfoError(error.error);
      }
    )

  }
}



