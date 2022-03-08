import { Component } from '@angular/core';

@Component({
  selector: 'ngx-tables',
  template: `
  
  
  
<nb-card class="card_fixed col-12">
    
<div class="container-fluid garanty">

    <div  class="row rtl text-center">
        <div [routerLink]="['/pages/tables/temperature']" class="col box">
        <i  class="fas fa-thermometer-half"></i>
            <span>Température</span>
        </div><!--.box-->
        <div  [routerLink]="['/pages/tables/TS']" class="col box">
        <i class="fas fa-thermometer"></i>
           
            <span>Température du sol</span>
        </div><!--.box-->
        <div [routerLink]="['/pages/tables/Hummidity']" class="col box">
        <i class="fas fa-tint"></i>
            
            <span>Humidité</span>
        </div><!--.box-->
        <div [routerLink]="['/pages/tables/HS']" class="col box">
        <i class="fas fa-tint-slash"></i>
            <span>Humidité du sol</span>
        </div><!--.box-->
        <div  [routerLink]="['/pages/tables/light']"  class="col box">
        <i class="fas fa-sun"></i>
           
            <span>Luminosité</span>
        </div><!--.box-->
        <div [routerLink]="['/pages/tables/conductivity']" class="col box">
        <i class="fas fa-bolt"></i>
            <span>Conductivité</span>
           
        </div><!--.box-->
        <div [routerLink]="['/pages/tables/ultraSonic']" class="col box"> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="36" height="36">
<g>
	<path d="M512,333l-29.94,0.067c-16.804,0-31-13.738-31-30h-30c0,16.542-13.458,30-30,30s-30.1-13.458-30.1-30   c0-0.101,0-0.104,0-0.003L360.897,0h-209.9l0.063,303.067c0,16.542-13.458,30-30,30s-30-13.458-30-30h-30   C61.06,319.609,47.602,333,31.122,333H0v179h512V333z M331.003,30l0.006,31H241v30h90.016l0.006,30H301v30h30.028l0.006,30H241v30   h90.041l0.006,30H301v30h30.053l0.007,32.067c0,16.542-13.458,30-30,30s-30-13.458-30-30h-30c0,16.542-13.458,30-30,30   s-30.11-13.458-30.11-30c0-0.101,0-0.104,0-0.003L180.893,30H331.003z M76.06,342.712c11.003,12.473,27.099,20.354,45,20.354   s33.997-7.881,45-20.354c11.003,12.473,27.099,20.354,45,20.354s33.997-7.881,45-20.354c11.003,12.473,27.099,20.354,45,20.354   s33.997-7.881,45-20.354c11.003,12.473,27.099,20.354,45,20.354c18.008,0,34.188-7.974,45.195-20.577   c11.737,13.109,28.196,20.541,45.745,20.576v59.999c-16.778-0.033-30.94-13.756-30.94-29.999h-30c0,16.542-13.458,30-30,30   s-30-13.458-30-30h-30c0,16.542-13.458,30-30,30s-30-13.458-30-30h-30c0,16.542-13.458,30-30,30s-30-13.458-30-30h-30   c0,16.542-13.458,30-30,30s-30-13.458-30-30h-30c0,16.512-13.408,29.951-29.908,30L30,423.051v-59.989   C30.409,362.97,56.588,364.786,76.06,342.712z M30,482v-28.946c0.521-0.117,26.177,2.198,46.06-20.342   c11.003,12.473,27.099,20.354,45,20.354s33.997-7.881,45-20.354c11.003,12.473,27.099,20.354,45,20.354s33.997-7.881,45-20.354   c11.003,12.473,27.099,20.354,45,20.354s33.997-7.881,45-20.354c11.003,12.473,27.099,20.354,45,20.354   c18.008,0,34.188-7.974,45.195-20.577c11.747,13.12,28.235,20.558,45.745,20.575V482H30z"/>
</g>
</svg>
        <span>EC</span>
       
    </div><!--.box-->
    </div><!--.row-->
</div><!--.container-fluid-->
       

</nb-card>
  
  
  
  <router-outlet ></router-outlet>`,
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent {

    public show:boolean = true;
  public buttonName:any = "fas fa-angle-double-up";

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "fas fa-angle-double-up";
    else
      this.buttonName = "fas fa-angle-double-down";
  }

}
