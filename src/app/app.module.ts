import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextAreaComponent } from './controls/textarea.component';
import { DynamicItemDirective } from './dynamic-item.directive';
import { ButtonComponent } from './controls/button.component';
import { WrapperComponent } from './wrapper.component';

import { DesignSurfaceComponent } from './design-surface.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartComponent } from './controls/chart.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    DesignSurfaceComponent,
    TextAreaComponent,
    ButtonComponent,
    ChartComponent,
    DynamicItemDirective,
    WrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
