/*
 * Slim v4.1.1 - Image Cropping Made Easy
 * Copyright (c) 2016 Rik Schennink - http://slimimagecropper.com
 */
declare function require(params: string): any;
const SlimLib = require('./slim.commonjs');

// Angular core
import { ViewChild, NgModule, Component, Input, ElementRef, OnInit } from '@angular/core';

@Component({
// tslint:disable-next-line:component-selector
selector: 'slim',
template: '<div #root><ng-content></ng-content></div>'
})

@NgModule({
declarations: [Slim],
exports: [Slim]
})

// tslint:disable-next-line:component-class-suffix
export class Slim {

@ViewChild('root')
element: ElementRef;

@Input()
options: Object;

// tslint:disable-next-line:use-life-cycle-interface
ngOnInit(): any {
SlimLib.create(this.element.nativeElement, this.options);
}

}
