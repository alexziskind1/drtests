import { Component, OnInit } from '@angular/core';
import { DynamicComponentBase } from '../dynamic-component.base';

@Component({
  selector: 'app-button',
  template: `
    <div>
      <button kendoButton (click)="onButtonClick()" [primary]="true">
        My Kendo UI Button
      </button>
    </div>
  `,
})
export class ButtonComponent extends DynamicComponentBase implements OnInit {
  content = 'OK';

  constructor() {
    super();
  }

  ngOnInit(): void {}

  onButtonClick(): void {
    alert('click');
  }
}
