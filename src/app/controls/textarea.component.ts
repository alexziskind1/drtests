import { Component, OnInit } from '@angular/core';
import { DynamicComponentBase } from '../dynamic-component.base';

@Component({
  selector: 'app-textarea-component',
  template: `
    <div>
      <textarea placeholder="sdfsdf">hello</textarea>
    </div>
  `,
})
export class TextAreaComponent extends DynamicComponentBase implements OnInit {
  placeholder = '';

  constructor() {
    super();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log('sdfdsdsfdsf');
    this.itemCreated.emit(true);
  }
}
