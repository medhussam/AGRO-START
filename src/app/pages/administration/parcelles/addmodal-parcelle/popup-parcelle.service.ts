import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PopupParcelleService {
    private modals: any[] = [];

    add(modal: any) {
        
        this.modals.push(modal);
        
        
    }

    remove(id: string) {
        this.modals = this.modals.filter(x => x.id !== id);
    }
    open(id) {
        const openModal = this.modals.find(x => x.id === id);
        
        openModal.open();
    }

    close(id: string) {
        const openModal = this.modals.find(x => x.id === id);
        openModal.close();
    }
}