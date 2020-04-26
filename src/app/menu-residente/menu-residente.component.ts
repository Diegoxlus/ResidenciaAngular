import { Component, OnInit } from '@angular/core';
import {faUtensilSpoon,faBookOpen} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-residente',
  templateUrl: './menu-residente.component.html',
  styleUrls: ['./menu-residente.component.css']
})
export class MenuResidenteComponent implements OnInit {
  iconoComida = faUtensilSpoon;
  iconoAnotar = faBookOpen;

  constructor( private router: Router) {
  }

  ngOnInit() {
  }

  irVerComidas() {
    this.router.navigate(['menu-mensual']);
  }

  irAnotarseComidas() {
    this.router.navigate(['lista-anotarse-comida']);
  }
}
