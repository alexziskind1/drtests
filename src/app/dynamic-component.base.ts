import { importExpr } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Directive, EventEmitter, Output } from '@angular/core';
import { DynItemWithRenderedHtml } from './dynamic-item.directive';

@Directive()
export class DynamicComponentBase {
  @Output() itemCreated: EventEmitter<boolean> = new EventEmitter();

  constructor() {}
}
