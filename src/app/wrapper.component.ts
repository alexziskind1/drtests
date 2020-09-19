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
      <ng-container dynamicItem [componentType]="componentType"></ng-container>
    </div>
  `,
})
export class WrapperComponent implements AfterViewInit {
  @Input() componentType: Type<DynamicComponentBase>;

  @Output() itemCreated: EventEmitter<
    DynItemWithRenderedHtml
  > = new EventEmitter();

  id = -1;

  constructor(
    private resolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef,
    private elRef: ElementRef<any>
  ) {}

  ngAfterViewInit(): void {
    const cHtml = this.elRef.nativeElement.outerHTML;
    this.itemCreated.emit({
      html: cHtml,

      id: this.id,
    });
  }
}
