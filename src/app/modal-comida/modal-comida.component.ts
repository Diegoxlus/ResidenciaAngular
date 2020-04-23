import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-comida',
  templateUrl: './modal-comida.component.html',
  styleUrls: ['./modal-comida.component.css'],
  providers:[NgbModal]
})
export class ModalComidaComponent{
  @ViewChild('content',null) content: any;
  closeResult : string;
  @Input() fecha;
  constructor(private modalService: NgbModal) {
}

  open() {
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
