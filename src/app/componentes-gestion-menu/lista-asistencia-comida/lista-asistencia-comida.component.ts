import { Component, OnInit } from '@angular/core';
import {Pago} from '../../models/pago';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {DialogoInformativoComponent} from '../../dialogo-informativo/dialogo-informativo.component';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import {PagoService} from '../../servicios/pago.service';
import {Router} from '@angular/router';
import {AsistenciaService} from '../../servicios/asistencia.service';
import {Asistencia} from '../../models/asistencia';
import {DatePipe} from '@angular/common';
import {faUserSlash} from '@fortawesome/free-solid-svg-icons/faUserSlash';

@Component({
  selector: 'app-lista-asistencia-comida',
  templateUrl: './lista-asistencia-comida.component.html',
  styleUrls: ['./lista-asistencia-comida.component.css']
})
export class ListaAsistenciaComidaComponent implements OnInit {

  displayedColumnsOP2: string[] = ['Residente', 'Comió','Cenó',"A.Comida", "A.Cena"];
  displayedColumnsOP1: string[] = ['Residente', "Asiste cena"];
  displayedColumnsOP0: string[] = ['Residente',"Asiste comida"];

  asistencias : Array<Asistencia>;
  dataSource : MatTableDataSource<Asistencia>;
  dialogRef: MatDialogRef<DialogoInformativoComponent>;
  dialogRef2: any ;
  espera = faClock;
  noAnotado = faUserSlash;
  correcto = faCheckCircle;
  incorrecto = faTimesCircle;
  opcion: number = 0;
  fecha:any;
  sfecha:any;


  constructor(private asistenciaService:AsistenciaService,private router: Router,public dialog: MatDialog, public datePipe: DatePipe) {
    this.asistencias = new Array<Asistencia>();
    this.dataSource = new MatTableDataSource<Asistencia>();
    this.fecha = new Date();
  }


  ngOnInit(): void {

  }


  refresh() {
    this.asistencias=[];
    this.sfecha = this.datePipe.transform(this.fecha,'yyyy-MM-dd').toString();
    if (this.opcion == 0) {
      this.asistenciaService.getAsistenciaComida(this.sfecha).subscribe(
        asistencias => {
          for (let asistencia of asistencias) {
            this.asistencias.push(new Asistencia(asistencia.residente, asistencia.dia, asistencia.come, asistencia.cena, asistencia.asiste_comida, asistencia.asiste_cena, '', '', asistencia.nombre, asistencia.apellidos))
          }
          console.log(asistencias);
          this.dataSource.data = this.asistencias;
          console.log(this.dataSource);
        }, error => {

        }
      )
    }
    if (this.opcion == 1) {
      this.asistenciaService.getAsistenciaCena(this.sfecha).subscribe(
        asistencias => {
          for (let asistencia of asistencias) {
            this.asistencias.push(new Asistencia(asistencia.residente, asistencia.dia, asistencia.come, asistencia.cena, asistencia.asiste_comida, asistencia.asiste_cena, '', '', asistencia.nombre, asistencia.apellidos))
          }
          this.dataSource.data = this.asistencias;
        }, error => {

        }
      )
    }
    if (this.opcion == 2) {
      this.asistenciaService.getAsistencia(this.sfecha).subscribe(
        asistencias => {
          for (let asistencia of asistencias) {
            this.asistencias.push(new Asistencia(asistencia.residente, asistencia.dia, asistencia.come, asistencia.cena, asistencia.asiste_comida, asistencia.asiste_cena, '', '', asistencia.nombre, asistencia.apellidos))
          }
          this.dataSource.data = this.asistencias;
        }, error => {

        }
      )
    }
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

  asisteComida(asistencia: Asistencia){
    console.log(asistencia);
    this.asistenciaService.asisteComida(asistencia.residente,asistencia.dia).subscribe(
      result=>{
        this.refresh();
      },error=>{

      }
    )
  }

  asisteCena(asistencia: Asistencia){
    this.asistenciaService.asisteCena(asistencia.residente,asistencia.dia).subscribe(
      result=>{
        this.refresh();
      },error=>{

      }
    )
  }

  noAsisteComida(asistencia: Asistencia){
    console.log(asistencia);
    this.asistenciaService.noAsisteComida(asistencia.residente,asistencia.dia).subscribe(
      result=>{
        this.refresh();
      },error=>{

      }
    )
  }

  noAsisteCena(asistencia: Asistencia){
    this.asistenciaService.noAsisteCena(asistencia.residente,asistencia.dia).subscribe(
      result=>{
        this.refresh();
      },error=>{

      }
    )
  }






  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filtro = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  cambiarLista() {
    this.refresh();
  }
}
