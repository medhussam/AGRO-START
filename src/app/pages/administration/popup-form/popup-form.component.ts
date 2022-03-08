import { stringify } from '@angular/compiler/src/util';
import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, Output,EventEmitter } from '@angular/core';
import { SeuilsService } from 'app/_services/seuils.service';


import { ModalService } from './modal.service';


@Component({
  selector: 'ngx-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupFormComponent implements OnInit {
    postId;

  @Input() seuil;
  @Input() _id: string;
  @Output() updateSeuil = new EventEmitter();  


  _seuil: any;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef, private seuilService: SeuilsService) {
      this.element = el.nativeElement;
  }

  ngOnInit(): void {
      // ensure id attribute exists
      if (!this._id) {
          console.error(this._id);
          return;
      }

      document.body.appendChild(this.element);
      this.element.addEventListener('click', el => {
          if (el.target.className === 'ngx-popup-form') {
              this.close();
          }
      });


      this.modalService.add(this);
  }
//   @Input() rowData: any;

  ngOnDestroy(): void {
      this.modalService.remove(this._id);
      this.element.remove();
  }

  open(): void {
      this.element.style.display = 'block';
      document.body.classList.add('ngx-popup-form-open');
  }

  close(): void {
      this.element.style.display = 'none';
      document.body.classList.remove('ngx-popup-form-open');
  }
// parametre,id_capteur,WM,wm,CM,cm
submitSeuil(seuil){
    this.updateSeuil.emit(seuil);
    console.log(seuil)
    this._seuil = seuil
 
    // .subscribe(s => this._seuil.push(s))
    this.element.style.display = 'none';
    document.body.classList.remove('ngx-popup-form-open');
}



}

