import { Component, OnInit } from '@angular/core';
import {faBed, faCogs, faNewspaper, faUserFriends, faUserTimes} from '@fortawesome/free-solid-svg-icons';
import {faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons/faMoneyCheckAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-secretaria',
  templateUrl: './menu-secretaria.component.html',
  styleUrls: ['./menu-secretaria.component.css']
})
export class MenuSecretariaComponent implements OnInit {

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
