import { Component} from '@angular/core';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons/faCalendarCheck';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-portero',
  templateUrl: './menu-portero.component.html',
  styleUrls: ['./menu-portero.component.css']
})
export class MenuPorteroComponent{


  iconoFinde = faCalendarCheck;

  constructor(private router: Router) {}

    irVerPermanencia(){
      this.router.navigate(['lista-permanencia']);
    }

}
