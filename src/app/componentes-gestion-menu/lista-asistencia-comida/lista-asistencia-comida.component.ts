import { Component} from '@angular/core';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {DialogoInformativoComponent} from '../../dialogo-informativo/dialogo-informativo.component';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import {Router} from '@angular/router';
import {AsistenciaService} from '../../servicios/asistencia.service';
import {Asistencia} from '../../models/asistencia';
import {DatePipe} from '@angular/common';
import {faUserSlash} from '@fortawesome/free-solid-svg-icons/faUserSlash';

/**
 * Componente empleado para que las cocineras o la secretaria gestione la asistencia a las comidas y cenas
 * de los residentes.
 */
@Component({
  selector: 'app-lista-asistencia-comida',
  templateUrl: './lista-asistencia-comida.component.html',
  styleUrls: ['./lista-asistencia-comida.component.css']
})


export class ListaAsistenciaComidaComponent{
  /**
   * Columnas empleadas en la table de generica donde aparecen las comidas y cenas de un dia determinado.
   */
  displayedColumnsOP2: string[] = ['Residente', 'Comió','Cenó',"A.Comida", "A.Cena"];
  /**
   * Columnas empleadas en la tabla de cenas de un dia determinado.
   */
  displayedColumnsOP1: string[] = ['Residente', "Asiste cena"];
  /**
   * Columnas empleadas en la tabla de comidas de un dia determinado.
   */
  displayedColumnsOP0: string[] = ['Residente',"Asiste comida"];

  /**
   * Array de asistencias de los residentes.
   */
  asistencias : Array<Asistencia>;
  /**
   * Contiene las asistencias que se van a mostrar en la tabla.
   */
  dataSource : MatTableDataSource<Asistencia>;
  /**
   * Dialogo informativo
   */
  dialogRef: MatDialogRef<DialogoInformativoComponent>;
  /**
   * Icono para cuando un residente no esta anotado.
   */
  noAnotado = faUserSlash;
  /**
   * Icono para cuando un ressidente asiste.
   */
  correcto = faCheckCircle;
  /**
   * Icono empleado para cuando un residente no asiste.
   */
  incorrecto = faTimesCircle;
  /**
   * Opcion:
   * 0: Vista comidas.
   * 1: Vista cenas.
   * 2: Vista genérica.
   */
  opcion: number = 0;
  /**
   * variable donde guardaremos la fecha actual.
   */
  fecha:any;
  /**
   * variable donde se guarda la fecha seleccionada.
   */
  sfecha:any;

  /**
   * Constructor del componente, contiene el servicio el router, se inicializa el dialogo y el datePipe para
   * la transformación de fechas.
   * @param asistenciaService
   * @param router
   * @param dialog
   * @param datePipe
   */
  constructor(private asistenciaService:AsistenciaService,private router: Router,public dialog: MatDialog, public datePipe: DatePipe) {
    this.asistencias = new Array<Asistencia>();
    this.dataSource = new MatTableDataSource<Asistencia>();
    this.fecha = new Date();
  }

  /**
   * Metodo empleado para volver a cargar las asistencias, dependiendo del tipo de tabla que quiera el usuario
   * se modifica la opción y por consecuente se obtienen diferentes datos para cada opción.
   */
  refresh() {
    this.asistencias=[];
    this.sfecha = this.datePipe.transform(this.fecha,'yyyy-MM-dd').toString();

    if (this.opcion == 0) {
      this.asistenciaService.getAsistenciaComida(this.sfecha).subscribe(
        asistencias => {
          for (let asistencia of asistencias) {
            this.asistencias.push(new Asistencia(asistencia.residente, asistencia.dia, asistencia.come, asistencia.cena, asistencia.asiste_comida, asistencia.asiste_cena, '', '', asistencia.nombre, asistencia.apellidos))
          }

          this.dataSource.data = this.asistencias;

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

  /**
   * Permite indicar que un residente asiste a una comida,al servicio, se le pasa el residente y el día.
   * @param asistencia
   */
  asisteComida(asistencia: Asistencia){

    this.asistenciaService.asisteComida(asistencia.residente,asistencia.dia).subscribe(
      result=>{
        this.refresh();
      },error=>{

      }
    )
  }

  /**
   * Permite indicar que un residente asiste a una cena, al servicio se le pasa el residente y el día.
   * @param asistencia
   */
  asisteCena(asistencia: Asistencia){
    this.asistenciaService.asisteCena(asistencia.residente,asistencia.dia).subscribe(
      result=>{
        this.refresh();
      },error=>{

      }
    )
  }

  /**
   * Permite indicar que un residente no asiste a una comida, al servicio se le pasa el residente y el día.
   * @param asistencia
   */
  noAsisteComida(asistencia: Asistencia){

    this.asistenciaService.noAsisteComida(asistencia.residente,asistencia.dia).subscribe(
      result=>{
        this.refresh();
      },error=>{

      }
    )
  }
  /**
   * Permite indicar que un residente no asiste a una cena, al servicio se le pasa el residente y el día.
   * @param asistencia
   */
  noAsisteCena(asistencia: Asistencia){
    this.asistenciaService.noAsisteCena(asistencia.residente,asistencia.dia).subscribe(
      result=>{
        this.refresh();
      },error=>{

      }
    )
  }


  /**
   * Filtro empleado para filtrar por todos los campos de la lista.
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Filtro empleado para no mostrar los sabados y domingos en el datepicker.
   * @param d
   */
  filtro = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  /**
   * Cada vez que se campia la opción debemos llamar al método refresh() para obtener los nuevos
   * valores del array de asistencias.
   */
  cambiarLista() {
    this.refresh();
  }
}
