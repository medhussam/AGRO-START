import { Component, OnInit } from '@angular/core';
import { ParcelleService } from 'app/_services/parcelle.service';
import { PopupParcelleService } from './addmodal-parcelle/popup-parcelle.service';

@Component({
  selector: 'ngx-parcelles',
  templateUrl: './parcelles.component.html',
  styleUrls: ['./parcelles.component.scss']
})
export class ParcellesComponent implements OnInit {
  parcelles: any = [];
  constructor(private serviceParcelle: ParcelleService,private serviceModal: PopupParcelleService) { }

  ngOnInit(): void {
    this.getParcelles();
  }
  getParcelles() {
    this.serviceParcelle.getParcelles().subscribe(ele => {
      this.parcelles = ele['features'];
      console.log(ele['features']);
    })
  }
  openModal(id){
   this.serviceModal.open(id);
  }
  closeModal(id){
    this.serviceModal.close(id);
   }

}
