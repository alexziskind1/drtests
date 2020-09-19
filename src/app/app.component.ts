import { Component, OnInit, Type } from '@angular/core';

import { DATA } from './data';
import { DynamicComponentBase } from './dynamic-component.base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  dynComponentTypes: Type<DynamicComponentBase>[] = [];

  public ngOnInit(): void {
    DATA.components.map((c) => {
      this.dynComponentTypes.push(c.componentType);
    });
  }
}
