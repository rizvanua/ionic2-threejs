/**
 * Created by Roman on 24.12.2016.
 */
import {Directive, ElementRef, Renderer} from '@angular/core';

@Directive ({
  selector:'[ngNameRo]'
})

export class NgNameDirective {

  constructor(  private elementRef: ElementRef, private renderer :Renderer) {
    console.log(this.elementRef.nativeElement);
    console.log(this.renderer);
    this.renderer.setElementAttribute(this.elementRef.nativeElement,'name', 'heart');

}
}
