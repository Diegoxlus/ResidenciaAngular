import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Noticia} from '../models/noticia';
import {MatDialog, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {DialogoInformativoComponent} from '../dialogo-informativo/dialogo-informativo.component';
import {Router} from '@angular/router';
import {DatosNoticiaService} from '../servicios/datos-noticia.service';
import {NoticiaService} from '../servicios/noticia.service';
import {Permanencia} from '../models/permanencia';
import {PermanenciaService} from '../servicios/permanencia.service';

@Component({
  selector: 'app-lista-permanencia-finde',
  templateUrl: './lista-permanencia-finde.component.html',
  styleUrls: ['./lista-permanencia-finde.component.css']
})
export class ListaPermanenciaFindeComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Apellidos', 'Habitacion'];
  arrayPermanencias: Array<Permanencia>;
  dataSource = new MatTableDataSource<Permanencia>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private cdr: ChangeDetectorRef, private router: Router, private permanenciaService: PermanenciaService, public dialog: MatDialog) {
    this.arrayPermanencias = new Array<Permanencia>()
  }

  ngOnInit() {
    this.permanenciaService.getPermanencias().subscribe(
      permanencias => {
        for (let permanencia of permanencias) {
          this.arrayPermanencias.push(new Permanencia('','','',permanencia.nombre,permanencia.apellidos,permanencia.habitacion));
        }
        this.dataSource = new MatTableDataSource<Permanencia>(this.arrayPermanencias);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel = "Permanencias por pagina";

      }, error => {

      }
    );
  }
}
