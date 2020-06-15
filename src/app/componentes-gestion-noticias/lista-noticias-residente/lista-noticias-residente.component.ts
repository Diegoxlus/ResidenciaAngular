import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {Noticia} from '../../models/noticia';
import {NoticiaService} from '../../servicios/noticia.service';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {DialogoInformativoComponent} from '../../dialogo-informativo/dialogo-informativo.component';
import {Router} from '@angular/router';

/**
 * Componente empleado para que los residentes puedan ver las noticias.
 */
@Component({
  selector: 'app-lista-noticias-residente',
  templateUrl: './lista-noticias-residente.component.html',
  styleUrls: ['./lista-noticias-residente.component.css']
})
export class ListaNoticiasResidenteComponent implements OnInit{
  /**
   * Columnas empleadas en la tabla.
   */
  displayedColumns: string[] = ['Fecha', 'Titulo', 'Detalles'];
  /**
   * Array de noticias que se obtienen de la API REST.
   */
  arrayNoticias: Array<Noticia>;
  /**
   * datos que se van a mostrar en la tabla, las noticias.
   */
  dataSource = new MatTableDataSource<Noticia>();
  /**
   * Icono de detalles.
   */
  detalles = faInfo;

  /**
   * Dialogo informativo empleado para ver los detalles de la noticia.
   */
  dialogRef: MatDialogRef<DialogoInformativoComponent>;
  /**
   * Componente hijo, un paginador para dividir la tabla de noticias.
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /**
   * Constructor del componente
   * cdr: Empleado para detectar cambios en el paginator.
   * router: Para navegar entre componentes.
   * dialog: Para mostrar el dialogo informativo.
   * @param cdr
   * @param router
   * @param noticiaService
   * @param dialog
   */
  constructor(private cdr : ChangeDetectorRef,private router: Router,private noticiaService: NoticiaService, public dialog: MatDialog){
    this.arrayNoticias = new Array<Noticia>()
  }
  /**
   * Obtenemos las noticias que ya existen en el sistema y las almacenamos en un array de noticias.
   * Inicializamos y cambiamos el string del paginator para que aparezca en español.
   */
  ngOnInit() {
    this.noticiaService.getNoticias().subscribe(
      noticias=>{
        for (let noticia of noticias){
          this.arrayNoticias.push(new Noticia(noticia.id,noticia.titulo,noticia.descripcion,noticia.dia));
        }

        this.dataSource = new MatTableDataSource<Noticia>(this.arrayNoticias);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Noticias por pagina";

      },error=>{

      }
    );
  }
  /**
   * Abrimos el dialogo informativo para poder ver de forma detallada la noticia.
   * @param noticia
   */
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

