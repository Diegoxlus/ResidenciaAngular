import { Component, OnInit } from '@angular/core';
import {faUtensilSpoon,faBookOpen} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-cocinera',
  templateUrl: './menu-cocinera.component.html',
  styleUrls: ['./menu-cocinera.component.css']
})
export class MenuCocineraComponent implements OnInit {
  iconoComida = faUtensilSpoon;
  iconoAnotar = faBookOpen;

  constructor( private router: Router) {
  }

  ngOnInit() {
  }
  irGestionComidas() {
    this.router.navigate(['/menu-mensual']);
  }
  irVerComidas() {
    this.router.navigate(['/gestion-menu']);
  }

}
