import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { DynamicComponentBase } from './dynamic-component.base';
import { DynItemWithRenderedHtml } from './dynamic-item.directive';

@Component({
  selector: '[app-wrapper]',
  template: `
    <div>
      <h6>wrapper content</h6>
      <ng-container
        dynamicItem
        [componentType]="componentType"
        (itemCreated)="onItemCreated($event)"
      ></ng-container>
    </div>
  `,
})
export class WrapperComponent implements AfterViewInit {
  componentType: Type<DynamicComponentBase>;
  itemCreated: EventEmitter<DynItemWithRenderedHtml> = new EventEmitter();
  id = -1;
  deferRender = false;

  constructor(
    private resolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef,
    private elRef: ElementRef<any>
  ) {}

  ngAfterViewInit(): void {
    console.log('wrapper ngAfterViewInit');
    if (this.deferRender) {
      return;
    }

    // setTimeout(() => {
    const cHtml = this.elRef.nativeElement.outerHTML;
    this.itemCreated.emit({
      html: cHtml,
      id: this.id,
    });
    // }, 100);
  }

  onItemCreated(boo): void {
    console.log('wrapper onItemCreated');
    if (!this.deferRender) {
      return;
    }
    const cHtml = this.elRef.nativeElement.outerHTML;
    this.itemCreated.emit({
      html: cHtml,
      id: this.id,
    });
  }
}
