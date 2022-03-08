import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card>
      <div class="icon-container">
        <div class="icon status-light {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="">
        <div class="title "><h6>{{ title | translate }}</h6></div>
        
        <div class="title h6">{{ value }}</div>
      </div>
    </nb-card>
  `,
})

export class StatusCardComponent {

  @Input() title: string;
  @Input() value: string;
  @Input() type: string;

  @Input() on = true;
}
