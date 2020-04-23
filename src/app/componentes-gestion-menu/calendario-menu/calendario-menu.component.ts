import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullCalendar/core/locales/es'
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import {Router} from '@angular/router';

import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {viewClassName} from '@angular/compiler';
import {ModalComidaComponent} from '../../modal-comida/modal-comida.component';
import {MenuService} from '../../servicios/menu.service';
import {Menu} from '../../models/menu';




@Component({
  selector: 'app-calendario-menu',
  templateUrl: './calendario-menu.component.html',
  styleUrls: ['./calendario-menu.component.css'],
})
export class CalendarioMenuComponent implements OnInit{
  calendarPlugins = [dayGridPlugin];
  locales: [esLocale];
  arrayMenus: Array<Menu>;
  eventos:Array<any>;
  constructor(private router: Router,private menuService: MenuService) {
    this.arrayMenus = new Array<Menu>();
    this.eventos = new Array<any>();
  }

  ngOnInit(){
    this.menuService.getMenus().subscribe(
      menus=>{
        for(let menu of menus){
          this.arrayMenus.push(new Menu(menu.dia,menu.comida, menu.cena,menu.modificado));
        }
        this.añadirEventos();


      },error => {
        console.log(error);
      }
    )
  }

  añadirEventos(){
    for(let menu of this.arrayMenus){
      this.eventos.push({title:menu.comida,date:menu.dia,color:'green'});
      this.eventos.push({title:menu.cena,date:menu.dia,color:'yellow'});
    }
  }

}
