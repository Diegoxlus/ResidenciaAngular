import { Component, OnInit } from '@angular/core';
import {faUtensilSpoon,faBookOpen} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';

@Component({
  selector: 'app-menu-cocinera',
  templateUrl: './menu-cocinera.component.html',
  styleUrls: ['./menu-cocinera.component.css']
})
export class MenuCocineraComponent implements OnInit {
  iconoComida = faUtensilSpoon;
  iconoAnotar = faBookOpen;
  iconoInscribir= faEdit;

  constructor( private router: Router) {
  }

  ngOnInit() {
  }
  irGestionComidas() {
    this.router.navigate(['alta-menu']);
  }
  irVerComidas() {
    this.router.navigate(['menu-mensual']);
  }

  irGestionAsistencia() {
    this.router.navigate(['lista-asistencia']);

  }
}
