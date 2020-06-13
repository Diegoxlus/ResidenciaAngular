import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {faInfoCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {AsistenciaService} from '../../servicios/asistencia.service';
import {Asistencia} from '../../models/asistencia';
import {DialogoInformativoComponent} from '../../dialogo-informativo/dialogo-informativo.component';

/**
 * Componente empleado para anotarse a la lista de las comidas y cenas.
 */

@Component({
  selector: 'app-lista-anotarse-comida',
  templateUrl: './lista-anotarse-comida.component.html',
  styleUrls: ['./lista-anotarse-comida.component.css']
})
export class ListaAnotarseComidaComponent implements OnInit {
  /**
   * Empleado para guardar las columnas de la tabla
   */
  displayedColumns: string[] = ['Dia', 'Comida', 'Cena', 'Anotarse'];
  /**
   * Array empleado para guardar las asistencias del residente.
   */
  asistencia : Array<Asistencia>;
  /**
   * Empleado para mostrar las asistencias en la tabla.
   */
  dataSource : MatTableDataSource<Asistencia>;
  /**
   * Dialogo empleado en el caso de que no se pueda apuntar a una comida o cena.
   */
  dialogRef: MatDialogRef<DialogoInformativoComponent>;
  /**
   * Icono de detalles
   */
  detalles = faInfoCircle;
  /**
   * Icono de eliminar
   */
  eliminar = faTrashAlt;

  /**
   * Constructor del componente, contiene:
   * asistenciaService: empleado para comunicarse con la API REST.
   * router: Para navegar entre componentes.
   * dialog: Para mostrar el dialogo en caso de que no se pueda apuntar/desapuntar.
   * @param asistenciaService
   * @param router
   * @param dialog
   */
  constructor(private asistenciaService:AsistenciaService,private router: Router,public dialog: MatDialog) {
    this.asistencia = new Array<Asistencia>();
    this.dataSource = new MatTableDataSource<Asistencia>();
  }

  /**
   * Se obtiene de la API REST las asistencias, es decir comidas y cenas a las que el residente puede apuntarse
   * o ya esta apuntado.
   */
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

  /**
   * Permite inscribirse a una comida un dia determinado.
   * @param dia
   */
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

  /**
   * Permite inscribirse a una cena un dia determinado.
   * @param dia
   */
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

  /**
   * Permite desinscribirse a una comida un dia determinado.
   * @param dia
   */
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

  /**
   * Permite desinscribirse de una cena un dia determinado.
   * @param dia
   */
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

  /**
   * Vuelve a cargar las asistencias, vuelve a cargar el array de asistencias con el JSON obtenido de
   * la API REST.
   */
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

  /**
   * Abre el dialogo informativo, indicando que es tarda para inscribirse a la comida o cena.
   * Esto sucede por las horas limites que tiene el residente para inscribirse a las comidas o cenas.
   * @param mensaje
   */
  abrirDialogoInformarivo(mensaje) {
    this.dialogRef = this.dialog.open(DialogoInformativoComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.mensage = mensaje;
    this.dialogRef.componentInstance.titulo = "Tarde!!";

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }

  /**
   * Filtro empleado para buscar por los campos de la tabla.
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
