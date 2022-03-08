import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslatePipe,TranslateService } from '@ngx-translate/core';
import { ExploitationService } from 'app/_services/exploitation.service';
import { MENU_ITEMS } from './pages-menu';

import { MenuItem } from '../@theme/custom-nebular/menu-item';
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  providers:[
    TranslatePipe
  ],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  constructor(public translate: TranslateService,private expService : ExploitationService){
                               // Register translation languages
                      
    // for(let i =0;i>MENU_ITEMS.length;i++){
    //   MENU_ITEMS[i].title = this.getIndexMenu(MENU_ITEMS[i].title);
    // }
    
  }

  public menu = [];



  ngOnInit() {
      this.getExp();
      this.menu = MENU_ITEMS;
      this.translateMenu();
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => { //Live reload
          this.translateMenu();
      });
  }
  private getExp(){
    
this.expService.getExploitations().subscribe(items =>{
    
    if(items.features == null)
    {
        this.menu.forEach((menuItem: MenuItem) => {
           this.disablePage(menuItem);
        });
    }
})
  }
    /**
   * @param menuItem
   */
  private disablePage(menuItem: MenuItem){
     
      if (menuItem.key != 'administration' && menuItem.title != 'AGRO-IOT' && menuItem.title != 'AGRO-SAT' && menuItem.title != 'Module de conseils' ) {
   
        menuItem.group = true;
      }
  }
  private translateMenu(): void {
      
      this.menu.forEach((menuItem: MenuItem) => {
          this.translateMenuTitle(menuItem);
      });
  }

  /**
   * @param menuItem
   * @param prefix
   */
  private translateMenuTitle(menuItem: MenuItem, prefix: string = ''): void {
    
      let key = '';
      try {
        
          key = (prefix !== '')
              ? PagesComponent.getMenuItemKey(menuItem, prefix)
              : PagesComponent.getMenuItemKey(menuItem);
      }
      catch (e) {
          return;
      }

      this.translate.get(key).subscribe((translation: string) => {
          
          menuItem.title = translation;
      });
      if (menuItem.children != null) {
          menuItem.children.forEach((childMenuItem: MenuItem) => {
              this.translateMenuTitle(childMenuItem, PagesComponent.trimLastSelector(key));
          });
      }
  }

  /**
   * @param menuItem
   * @param prefix
   * @returns {string}
   */
  private static getMenuItemKey(menuItem: MenuItem, prefix: string = 'menu'): string {
     
    if (menuItem.key == null) {
          throw new Error('Key not found');
      }

      const key = menuItem.key.toLowerCase();
      if (menuItem.children != null) {
          return prefix + '.' + key + '.' + key;
      }
      return prefix + '.' + key;
  }

  /**
   * @param key
   * @returns {string}
   */
  private static trimLastSelector(key: string): string {
      const keyParts = key.split('.');
      keyParts.pop();
      return keyParts.join('.');
  }
}
