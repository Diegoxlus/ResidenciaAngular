import { Component, OnInit } from '@angular/core';
import {faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {faBed} from '@fortawesome/free-solid-svg-icons';
import {faCogs} from '@fortawesome/free-solid-svg-icons';
import {faUserTimes} from '@fortawesome/free-solid-svg-icons';
import {faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons/faMoneyCheckAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';


@Component({
  selector: 'app-menu-directora',
  templateUrl: './menu-directora.component.html',
  styleUrls: ['./menu-directora.component.css']
})
export class MenuDirectoraComponent implements OnInit {
  iconoUsuarios = faUserFriends;
  iconoHabitacion = faBed;
  iconoParte = faUserTimes;
  iconoNoticia = faNewspaper;
  iconoConfiguracion = faCogs;
  iconoPagos = faMoneyCheckAlt;
  iconoInscribir = faEdit;

  constructor( private router: Router) {
  }

  ngOnInit() {
  }
  irGestionPersonal() {
    this.router.navigate(['/personal']);
  }
  irGestionHabitaciones() {
    console.log("Redirect correcto");
    this.router.navigate(['/habitaciones']);
  }
  irGestionPartes() {
    this.router.navigate(['/lista-partes']);
  }
  irGestionNoticias() {
    this.router.navigate(['/gestion-noticias']);
  }

  irConfiguracion() {
    this.router.navigate(['/configuracion']);
  }

  irGestionPagos() {
    this.router.navigate(['/lista-pagos']);

  }

  irGestionAsistencia() {
    this.router.navigate(['/lista-asistencia']);

  }
}
