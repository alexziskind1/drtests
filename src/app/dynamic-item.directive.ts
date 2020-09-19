import {
  AfterViewInit,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { DynamicComponentBase } from './dynamic-component.base';

export interface DynItemWithRenderedHtml {
  html: string;
  id: number;
}

@Directive({ selector: '[dynamicItem]' })
export class DynamicItemDirective implements OnInit, AfterViewInit {
  @Input() componentType: Type<DynamicComponentBase>;

  @Output() itemCreated: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private resolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef,
    private elRef: ElementRef<any>
  ) {}

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(this.componentType);
    const componentRef = this.viewContainerRef.createComponent<
      DynamicComponentBase
    >(factory);
    componentRef.changeDetectorRef.detectChanges();

    componentRef.instance.itemCreated.subscribe(() => {
      this.itemCreated.emit(true);
    });
  }

  ngAfterViewInit(): void {}
}
