import {
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  Component,
  Input,
  Type,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { IDataItem } from './data';
import { DynamicComponentBase } from './dynamic-component.base';
import { DynItemWithRenderedHtml } from './dynamic-item.directive';
import { WrapperComponent } from './wrapper.component';

@Component({
  selector: 'app-design-surface',
  templateUrl: 'design-surface.component.html',
})
export class DesignSurfaceComponent implements OnInit, AfterViewInit {
  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  @Input() dynComponentTypes: Type<DynamicComponentBase>[] = [];
  @Input() dynItems: IDataItem[] = [];

  count = 0;
  componentsReferences = Array<ComponentRef<WrapperComponent>>();

  constructor(private resolver: ComponentFactoryResolver) {}

  ngAfterViewInit(): void {
    // this.dynComponentTypes.map((t) => this.createComponent(t));
    this.dynItems.map((i) => this.createComponent(i));
  }

  ngOnInit(): void {}

  createComponent(i: IDataItem): void {
    const wrapperFactory = this.resolver.resolveComponentFactory(
      WrapperComponent
    );

    const wrapperComponentRef = this.viewContainerRef.createComponent(
      wrapperFactory
    );
    wrapperComponentRef.instance.id = ++this.count;
    wrapperComponentRef.instance.deferRender = i.deferRender;
    wrapperComponentRef.instance.componentType = i.componentType;
    wrapperComponentRef.instance.itemCreated.subscribe((d) =>
      this.onItemCreated(d)
    );
    wrapperComponentRef.changeDetectorRef.detectChanges();
    this.componentsReferences.push(wrapperComponentRef);
  }

  /*
  remove(key: number): void {
    if (this.viewContainerRef.length < 1) {
      return;
    }

    const componentRef = this.componentsReferences.filter(
      (x) => x.instance.id === key
    )[0];

    const viewContainerRefIndex: number = this.viewContainerRef.indexOf(componentRef.hostView);

    // removing component from container
    this.viewContainerRef.remove(viewContainerRefIndex);

    // removing component from the list
    this.componentsReferences = this.componentsReferences.filter(
      (x) => x.instance.id !== key
    );
  }
  */

  public onItemCreated(d: DynItemWithRenderedHtml): void {
    document.body.appendChild(createElementFromHTML(d.html));

    this.count--;

    if (this.count === 0) {
      setTimeout(() => {
        this.viewContainerRef.clear();
      }, 3000);
    }
  }
}

function createElementFromHTML(htmlString: string): Node {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
