import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {DialogoInformativoComponent} from '../../dialogo-informativo/dialogo-informativo.component';
import {faInfoCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {ParteService} from '../../servicios/parte.service';
import {Parte} from '../../models/parte';
import {DatosParteService} from '../../servicios/datos-parte.service';
import {DialogoConfirmacionComponent} from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import {GravedadPipePipe} from '../../pippes/gravedad-pipe.pipe';

/**
 * Componente empleado para listar los partes de los residentes.
 */
@Component({
  selector: 'app-lista-partes',
  templateUrl: './lista-partes.component.html',
  styleUrls: ['./lista-partes.component.css']
})
export class ListaPartesComponent implements OnInit {
  /**
   * Columnas que va a tener la tabla.
   */
  displayedColumns: string[] = ['Residente', 'Gravedad',"Acciones"];
  /**
   * Array que contiene los partes de la API REST.
   */
  partes : Array<Parte>;
  /**
   * Datos que se le van a pasar a la tabla, el array de partes.
   */
  dataSource : MatTableDataSource<any>;
  /**
   * Permite abrir el dialogo informativo.
   */
  dialogRef: MatDialogRef<DialogoInformativoComponent>;
  /**
   * Permite abrir el dialogo de confiramción de borrado.
   */
  dialogRef2: any ;
  /**
   * Icono de detalles.
   */
  detalles = faInfoCircle;
  /**
   * Icono de eliminar.
   */
  eliminar = faTrashAlt;

  /**
   * Constructor del componente, se instancian:
   * parteService: Servicio empleado para comunicarnos con la API REST
   * router: Empleado para navegar entre los componentes
   * datosParteService: Contiene los datos del parte que vamos a editar cuando pinchemos en el botón
   * editar parte.
   * dialog: Permite abrir el dialogo inofrmativo.
   * @param parteService
   * @param datosParteService
   * @param router
   * @param dialog
   */
  constructor(private parteService:ParteService,private datosParteService: DatosParteService,public router: Router,public dialog: MatDialog,private gravedadPipe: GravedadPipePipe) {
    this.partes = new Array<Parte>();
    this.dataSource = new MatTableDataSource<any>();
  }

  /**
   * Obtenemos los partes de la API REST y los insertamos en el array de partes.
   */
  ngOnInit(): void {
    this.parteService.getPartes().subscribe(
      partes => {
        for (let parte of partes){
          this.partes.push(new Parte(parte.id,parte.residente,parte.gravedad,parte.motivo,parte.nombre,parte.apellidos));
        }
        this.dataSource.data = this.partes;
        (this.dataSource);
      }
    )
  }

  /**
   * Volvemos a actualizar el array de partes y los datos de la tabla.
   */
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

  /**
   * Permite abrir el dialogo informativo con la información del parte que se pasa como parámetro.
   * @param parte
   */
  abrirDialogoInformarivo(parte) {
    (parte);
    this.dialogRef = this.dialog.open(DialogoInformativoComponent, {
      disableClose: false,

    });
    this.dialogRef.componentInstance.mensage = parte.motivo;

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }

  /**
   * Permite abrir in dialogo para informar de un error.
   * @param error
   */
  abrirDialogoInfoError(error) {
    this.dialogRef = this.dialog.open(DialogoInformativoComponent, {
      disableClose: false,

    });
    this.dialogRef.componentInstance.mensage = error;

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }

  /**
   * Permite abrir el dialogo de confirmación de borrado, en caso de que lo queramos eliminar se llama
   * a la función eliminarParte la cual recibe el parte a eliminar como parámetro.
   * @param parte
   */
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

  /**
   * Permite aplicar un filtro a la tabla por todos los campos.
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Permite cambiar al componente de edición. El servicio datosParteService con el método cambiarParte
   * al que se le pasa el parte que se quiere editar.
   * Después se realiza la navegación al nuevo componente.
   * @param parte
   */
  editarParte(parte: Parte) {
    this.datosParteService.cambiarParte(parte);
    this.router.navigate(['/editar-parte']);

  }

  /**
   * Permite eliminar un parte del sistema gracias al servicio que envia el id del parte que se quiere borrar
   * a la API REST.
   * @param parte
   */
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



