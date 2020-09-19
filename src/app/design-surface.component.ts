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

  count = 0;
  componentsReferences = Array<ComponentRef<WrapperComponent>>();

  constructor(private resolver: ComponentFactoryResolver) {}

  ngAfterViewInit(): void {
    this.dynComponentTypes.map((t) => this.createComponent(t));
  }

  ngOnInit(): void {}

  createComponent(t: Type<DynamicComponentBase>): void {
    const wrapperFactory = this.resolver.resolveComponentFactory(
      WrapperComponent
    );

    const wrapperComponentRef = this.viewContainerRef.createComponent(
      wrapperFactory
    );
    wrapperComponentRef.instance.id = ++this.count;
    wrapperComponentRef.instance.componentType = t;
    wrapperComponentRef.instance.itemCreated.subscribe((d) =>
      this.onItemCreated(d)
    );
    wrapperComponentRef.changeDetectorRef.detectChanges();
    this.componentsReferences.push(wrapperComponentRef);
  }

  /*
  remove(key: number): void {
    if (this.VCR.length < 1) {
      return;
    }

    const componentRef = this.componentsReferences.filter(
      (x) => x.instance.id === key
    )[0];

    const vcrIndex: number = this.VCR.indexOf(componentRef.hostView);

    // removing component from container
    this.VCR.remove(vcrIndex);

    // removing component from the list
    this.componentsReferences = this.componentsReferences.filter(
      (x) => x.instance.id !== key
    );
  }
  */

  public onItemCreated(d: DynItemWithRenderedHtml): void {
    console.log(d.html);

    setTimeout(() => {
      document.body.appendChild(createElementFromHTML(d.html));
    }, 300);

    this.count--;
    if (this.count === 0) {
      // this.VCR.clear();
    }
  }
}

function createElementFromHTML(htmlString: string): Node {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
