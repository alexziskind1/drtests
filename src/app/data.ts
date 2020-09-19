import { ButtonComponent } from './controls/button.component';
import { ChartComponent } from './controls/chart.component';
import { TextAreaComponent } from './controls/textarea.component';

export const DATA = {
  components: [
    {
      controlType: 'TextArea',
      componentType: TextAreaComponent,
      data: {
        placeholder: 'Enter name...',
      },
    },
    {
      controlType: 'Button',
      componentType: ButtonComponent,
      data: {
        content: 'Submit',
      },
    },
    {
      controlType: 'Chart',
      componentType: ChartComponent,
      data: {
        content: 'Submit',
      },
    },
  ],
};
