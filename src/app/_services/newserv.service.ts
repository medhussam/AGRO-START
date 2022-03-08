import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
@Injectable({
  providedIn: 'root'
})
export class NewservService {

  constructor(private http: HttpClient) { }

  Menu(){
    const MENU_ITEMS: NbMenuItem[] = [
  

      {
        title: 'Tableau de bord (V1.1)',
        icon: 'home-outline',
        link: '/pages/iot-dashboard', 
        group :true
        
      },
    
      {
        title: 'Capteurs',
        icon: 'shake-outline',
        link: '/pages/capteurs',
    
      },
    
      {
        title: 'Table et data',
        icon: 'cube-outline',
        link: '/pages/tables/temperature',
    
      }, 
      
      {
        title: 'Maps',
        icon: 'book-open-outline',
        group: true,
        //link: '/pages/newMaps',
      },
    
      {
        title: 'Module de conseils',
        icon: 'award-outline',
        children: [
          {
            title: 'Évapotranspiration',
            link: '',
            icon: { icon: 'ruler', pack: 'fa' },
            children: [
              {
                title: 'ET₀ (De référence)',
                link: '/pages/evapo',
                icon: { icon: 'angle-right', pack: 'fa' },
    
              }, {
                title: 'ETc Spaciale (Des cultures)',
                icon: { icon: 'angle-right', pack: 'fa' },
                  link: '/pages/evapoSim',
    
              }
            ]
          },
          {
            title: 'Irrigation',
            group: true,
            icon: { icon: 'cubes', pack: 'fas' },
          },
          {
            title: 'Fertilisation',
            group: true,
            icon: { icon: 'diagnoses', pack: 'fas' },
          },
    
        ],
      },
    
      {
    
        title: 'Agro surveillance',
        icon: 'monitor-outline',
        children: [
          {
            title: 'Imagerie satellitaire',
            link: '/pages/Agro-monitoring/Monitoring',
            icon: { icon: 'camera-retro', pack: 'fa' },
          },
          {
            title: 'Météo du sol',
            link: '/pages/Agro-monitoring/soilData',
            icon: { icon: 'seedling', pack: 'fa' },
          },
    
    
        ],
    
      },
      {
        title: 'Notification',
        icon: 'alert-circle-outline',
        group: true,
      },
      {
        title: 'Alerts',
        icon: 'alert-triangle-outline',
        link: '/pages/alertes'
    
      },
      {
        title: 'Informations utiles',
        icon: 'checkmark-circle-outline',
        link: '/pages/InformationUtiles/Dashboard',
      },
       {
        title: 'Administration',
        icon: 'award-outline',
        link: '/pages/Adminstrator/Dashboard'
    
      },
    ];
    return MENU_ITEMS;
  }
}
