import { Component, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter, ViewEncapsulation, OnChanges } from '@angular/core';
import { ExploitationService } from 'app/_services/exploitation.service';

import { PopupParcelleService } from './popup-parcelle.service';

@Component({
  selector: 'ngx-addmodal-parcelle',
  templateUrl: './addmodal-parcelle.component.html',
  styleUrls: ['./addmodal-parcelle.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddmodalParcelleComponent implements OnDestroy, OnInit {

  constructor(private el: ElementRef, private modalService: PopupParcelleService,private serviceExpl: ExploitationService) { this.element = this.el.nativeElement; }

  @Input() id;
  @Input() editParcelle;
  element: any;
  cultures: any = [];
  province: any = [];
  selectedIprvince;
    selectedIRegeion;
  ngOnInit(): void { 
    console.log(this.editParcelle);
        if (!this.id) {
      console.error('modal must have an id gggggggggggggggg');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'ngx-addmodal-parcelle') {
        this.close();
      }
    });

    //add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);

  }
  updateParcelle(event){
    console.log(event);
    this.element.style.display = 'none';
    document.body.classList.remove('ngx-addmodal-parcelle-open');
  }
  selectRegion(event){
    console.log(event)
    this.editParcelle.properties.region = event;
    this.getProvance(event);
}
selectProvance(event){
  console.log(event)
  this.editParcelle.properties.province = event;
  console.log(this.editParcelle);
}
selectTypeCuture(type){
  this.editParcelle.properties.type_culture = type;
this.getCulture(type);
}
selectTypeSol(typeSol){
  this.editParcelle.properties.type_sol = typeSol;
console.log(typeSol);
}
selectCulture(culture){
  this.editParcelle.properties.culture = culture;
}
getCulture(type){
this.serviceExpl.culture(type).subscribe(culture=>{
  console.log(culture);
  this.cultures = culture;

})
}
getProvance(region){
  this.serviceExpl.provance(region).subscribe(prov=> {
    console.log(prov);
    this.province = prov;
    this.selectedIprvince = this.province[0].province;
  })
}

  closeModal() {
    this.element.style.display = 'block';
    document.body.classList.add('ngx-addmodal-parcelle-open');
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    // debugger
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {

    this.element.style.display = 'block';
    document.body.classList.add('ngx-addmodal-parcelle-open');
  }

  //   // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('ngx-addmodal-parcelle-open');
  }
}
