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

export interface DynItemWithRenderedHtml {
  html: string;
  id: number;
}

@Directive({ selector: '[dynamicItem]' })
export class DynamicItemDirective implements OnInit, AfterViewInit {
  @Input() componentType: Type<any>;

  @Output() itemCreated: EventEmitter<
    DynItemWithRenderedHtml
  > = new EventEmitter();

  constructor(
    private resolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef,
    private elRef: ElementRef<any>
  ) {}

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(this.componentType);
    const componentRef = this.viewContainerRef.createComponent(factory);
    componentRef.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {}
}
