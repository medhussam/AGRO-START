import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Modal2Service {

  private modals: any[] = [];

  add(modal: any) {
      this.modals.push(modal);
  }

  remove(id: string) {
      this.modals = this.modals.filter(x => x._id !== id);
  }
  open(id: string) {
      
      const modal = this.modals.find(x => x._id === id);
      modal.open();
  }

  close(id: string) {
      const modal = this.modals.find(x => x._id === id);
      modal.close();
  }
}
