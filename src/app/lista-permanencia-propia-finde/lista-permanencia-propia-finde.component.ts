import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Permanencia} from '../models/permanencia';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {PermanenciaService} from '../servicios/permanencia.service';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {DialogoConfirmacionComponent} from '../dialogo-confirmacion/dialogo-confirmacion.component';
import {DialogoInformativoComponent} from '../dialogo-informativo/dialogo-informativo.component';

/**
 * Componente que controla lis lista de permanencia del propio residente.
 */

@Component({
  selector: 'app-lista-permanencia-propia-finde',
  templateUrl: './lista-permanencia-propia-finde.component.html',
  styleUrls: ['./lista-permanencia-propia-finde.component.css']
})
export class ListaPermanenciaPropiaFindeComponent implements OnInit {
  /**
   * Icono de eliminar.
   */
  eliminar = faTrashAlt;
  /**
   * Dialogo de confirmación de eliminar.
   */
  dialogRef2: any;
  /**
   * Dialogo de información de error.
   */
  dialogRef: any;
  /**
   * Columnas de la tabla.
   */
  displayedColumns: string[] = ['Dia', 'Cancelar'];
  /**
   * Array de permanencias del propio usuario.
   */
  arrayPermanencias: Array<Permanencia>;
  /**
   * Datos de la tabla, se construye con el array de permanencias.
   */
  dataSource = new MatTableDataSource<Permanencia>();

  /**
   * Componente hijo, un paginador para dividir las permanencias.
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /**
   * Constructor del componente, tiene las siguientes instancias:
   * cdr: Detecta los cambios del paginator.
   * router: Permite navegar entre componentes.
   * permanenciaService: Permite comunicarnos con la API REST.
   * dialog: Dialogo de información de error.
   * @param cdr
   * @param router
   * @param permanenciaService
   * @param dialog
   */
  constructor(private cdr: ChangeDetectorRef, public router: Router, private permanenciaService: PermanenciaService, public dialog: MatDialog) {
    this.arrayPermanencias = new Array<Permanencia>()
  }

  /**
   * Al iniciar el componente se obtienen todas las permanencias propias, se establece el paginador con el texto
   * en español, y se inicializa los datos de la tabla con el array del permanencias.
   */
  ngOnInit() {
    this.arrayPermanencias= [];
    this.permanenciaService.consultarPermanencias().subscribe(
      permanencias => {
        for (let permanencia of permanencias) {
          this.arrayPermanencias.push(new Permanencia(permanencia.id,'',permanencia.dia));
        }
        this.dataSource = new MatTableDataSource<Permanencia>(this.arrayPermanencias);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel = "Permanencias por página";

      }, error => {

      }
    );
  }

  /**
   * Abre el dialogo de confirmación de eliminar.
   * @param permanencia
   */
  openConfirmationDialogE(permanencia: Permanencia) {
    this.dialogRef2 = this.dialog.open(DialogoConfirmacionComponent, {
      disableClose: false
    });
    this.dialogRef2.componentInstance.confirmMessage = "Quieres desantonar tu permanencia el dia: "+ permanencia.dia;

    this.dialogRef2.afterClosed().subscribe(result => {
      if(result) {
        this.eliminarPermanencia(permanencia);
      }
      this.dialogRef2 = null;
    });
  }

  /**
   * Permite eliminar una permanencia gracias a su id.
   * @param permanencia
   */
  private eliminarPermanencia(permanencia: Permanencia) {
    this.permanenciaService.eliminarPermanencia(permanencia.id).subscribe(
      result=>{
        this.ngOnInit();
      },error=>{
        this.abrirDialogoInfoError(error)
      }
    )
  }

  /**
   * Permite abrir el dialogo de información de error.
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
}
