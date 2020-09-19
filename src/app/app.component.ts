import { Component, OnInit, Type } from '@angular/core';

import { DATA, IDataItem } from './data';
import { DynamicComponentBase } from './dynamic-component.base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  dynComponentTypes: Type<DynamicComponentBase>[] = [];
  dynItems: IDataItem[] = [];

  public ngOnInit(): void {
    DATA.components.map((c) => {
      this.dynComponentTypes.push(c.componentType);
      this.dynItems.push(c);
    });
  }
}
