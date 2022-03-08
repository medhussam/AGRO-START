import { HttpClient } from '@angular/common/http';
import { Component,NgZone, OnInit, OnDestroy , Input, Output, EventEmitter,ElementRef, Renderer2 ,ChangeDetectorRef} from '@angular/core';
import { AlertesService } from 'app/_services/alertes.service';

import { ViewCell } from 'ng2-smart-table'; 
import { Subscription ,Subject} from 'rxjs';



@Component({
  selector: 'app-button-view',
  templateUrl: './button-view.component.html',
  styleUrls: ['./button-view.component.scss']
})
export class ButtonViewComponent implements ViewCell, OnInit {

  getToken() {
    var h = localStorage.getItem('x-access-token');
    var j = JSON.parse(h);
    return j.accessToken
  }


  constructor(
    private alerteService: AlertesService,private http: HttpClient
  ) {}


  show: boolean;
  postID :any;

  openModalBox() {
    this.show = true;
    this.http.post<any>('http://10.10.100.111:3004/alertseen/',{
      "id_alert": this.rowData._id
    },
    {
      headers: {
        "x-access-token": this.getToken(),
        "accept": "*/*"
      }
    }).subscribe(data => {
      this.postID = data;
    })
   this.rowData.vu = 'true';
    console.log('shshshshsh'+this.rowData._id)
    console.log('shshshshsh'+this.postID)
  }

  closeModalBox() {
    this.show = false;
  }
  
  onLeave() {
    this.show = false;
  }



  renderValue: string;

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
    
  }

  @Input() value: string | number;
  @Input() rowData: any;

  isOpen:boolean = false;
  expanededComp:any = null;

  onClick(event) {
    
    console.log("toggle");
    this.renderValue = this.value.toString().toUpperCase();
   
    
  }

}