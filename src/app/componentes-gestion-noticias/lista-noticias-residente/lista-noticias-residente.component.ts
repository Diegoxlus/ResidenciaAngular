import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {Noticia} from '../../models/noticia';
import {NoticiaService} from '../../servicios/noticia.service';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {DialogoInformativoComponent} from '../../dialogo-informativo/dialogo-informativo.component';
import {DialogoConfirmacionComponent} from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {Router} from '@angular/router';
import {DatosNoticiaService} from '../../servicios/datos-noticia.service';

@Component({
  selector: 'app-lista-noticias-residente',
  templateUrl: './lista-noticias-residente.component.html',
  styleUrls: ['./lista-noticias-residente.component.css']
})
export class ListaNoticiasResidenteComponent implements OnInit{

  displayedColumns: string[] = ['Fecha', 'Titulo', 'Detalles'];
  arrayNoticias: Array<Noticia>;
  dataSource = new MatTableDataSource<Noticia>();
  detalles = faInfo;

  dialogRef: MatDialogRef<DialogoInformativoComponent>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private cdr : ChangeDetectorRef,private router: Router,private datosNoticiaService: DatosNoticiaService,private noticiaService: NoticiaService, public dialog: MatDialog){
    this.arrayNoticias = new Array<Noticia>()
  }

  ngOnInit() {
    this.noticiaService.getNoticias().subscribe(
      noticias=>{
        for (let noticia of noticias){
          this.arrayNoticias.push(new Noticia(noticia.id,noticia.titulo,noticia.descripcion,noticia.dia));
        }
        console.log(this.arrayNoticias);
        this.dataSource = new MatTableDataSource<Noticia>(this.arrayNoticias);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Noticias por pagina";

      },error=>{

      }
    );
  }

  abrirDialogoInformarivo(noticia: Noticia) {
    this.dialogRef = this.dialog.open(DialogoInformativoComponent, {
      disableClose: false,

    });
    this.dialogRef.componentInstance.titulo =noticia.dia+' '+noticia.titulo;
    this.dialogRef.componentInstance.mensage = noticia.descripcion;

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }

}

