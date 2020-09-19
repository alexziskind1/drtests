import { Type } from '@angular/core';
import { ButtonComponent } from './controls/button.component';
import { ChartComponent } from './controls/chart.component';
import { TextAreaComponent } from './controls/textarea.component';
import { DynamicComponentBase } from './dynamic-component.base';

export interface IDataItem {
  controlType: string;
  componentType: Type<DynamicComponentBase>;
  deferRender: boolean;
  data: {
    [key: string]: any;
  };
}
export interface IData {
  components: IDataItem[];
}

export const DATA: IData = {
  components: [
    {
      controlType: 'TextArea',
      componentType: TextAreaComponent,
      deferRender: false,
      data: {
        placeholder: 'Enter name...',
      },
    },
    {
      controlType: 'Button',
      componentType: ButtonComponent,
      deferRender: false,
      data: {
        content: 'Submit',
      },
    },
    {
      controlType: 'Chart',
      componentType: ChartComponent,
      deferRender: true,
      data: {
        content: 'Submit',
      },
    },
  ],
};
