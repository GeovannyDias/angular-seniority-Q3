import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCrashImage]'
})
export class CrashImageDirective {
  constructor(
    private elementRef: ElementRef,
  ) { }

  @HostListener('error')
  loadImageDefault() {
    const imgElement = this.elementRef.nativeElement;
    imgElement.src = 'assets/not-found.png';
  }




}
