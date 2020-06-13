import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {Permanencia} from '../models/permanencia';
import {PermanenciaService} from '../servicios/permanencia.service';

/**
 * Componente que controla la lista de residentes que permanecen en la residencia el fin de semana.
 */
@Component({
  selector: 'app-lista-permanencia-finde',
  templateUrl: './lista-permanencia-finde.component.html',
  styleUrls: ['./lista-permanencia-finde.component.css']
})
export class ListaPermanenciaFindeComponent implements OnInit {
  /**
   * Array que contiene las columnas de la tabla.
   */
  displayedColumns: string[] = ['Nombre', 'Apellidos', 'Habitacion'];
  /**
   * Contiene un array con las permanencias del fin de semana.
   */
  arrayPermanencias: Array<Permanencia>;
  /**
   * Contiene los datos que se van a mostrar en la tabla, un array de permanencias.
   */
  dataSource = new MatTableDataSource<Permanencia>();

  /**
   * Componentte hijo, un paginador para dividir las asistencias.
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /**
   * Constructor del componente, tiene las siguientes instancias:
   * cdr: Detecta los cambios del paginator.
   * router: Permite navegar entre componentes.
   * permanenciaService: Permite comunicarnos con la API REST.
   * @param cdr
   * @param router
   * @param permanenciaService
   */
  constructor(private cdr: ChangeDetectorRef, private router: Router, private permanenciaService: PermanenciaService) {
    this.arrayPermanencias = new Array<Permanencia>()
  }

  /**
   * Al iniciar el componente se obtienen todas las permanencias, se establece el paginador con el texto
   * en español, y se inicializa los datos de la tabla con el array del permanencias.
   */
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
