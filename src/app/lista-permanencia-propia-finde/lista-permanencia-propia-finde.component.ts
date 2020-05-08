import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Permanencia} from '../models/permanencia';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {PermanenciaService} from '../servicios/permanencia.service';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {Noticia} from '../models/noticia';
import {DialogoConfirmacionComponent} from '../dialogo-confirmacion/dialogo-confirmacion.component';
import {DialogoInformativoComponent} from '../dialogo-informativo/dialogo-informativo.component';

@Component({
  selector: 'app-lista-permanencia-propia-finde',
  templateUrl: './lista-permanencia-propia-finde.component.html',
  styleUrls: ['./lista-permanencia-propia-finde.component.css']
})
export class ListaPermanenciaPropiaFindeComponent implements OnInit {
  eliminar = faTrashAlt;
  dialogRef2: any;
  dialogRef: any;
  displayedColumns: string[] = ['Dia', 'Cancelar'];
  arrayPermanencias: Array<Permanencia>;
  dataSource = new MatTableDataSource<Permanencia>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private cdr: ChangeDetectorRef, private router: Router, private permanenciaService: PermanenciaService, public dialog: MatDialog) {
    this.arrayPermanencias = new Array<Permanencia>()
  }

  ngOnInit() {
    this.arrayPermanencias= [];
    this.permanenciaService.getMisPermanencias().subscribe(
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

  private eliminarPermanencia(permanencia: Permanencia) {
    this.permanenciaService.eliminarAsistencia(permanencia.id).subscribe(
      result=>{
        this.ngOnInit();
      },error=>{
        this.abrirDialogoInfoError(error)
      }
    )
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
}
