import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CrashImageDirective } from './crash-image.directive';

describe('CrashImageDirective', () => {
  let imgElement: ElementRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        //more providers
        { provide: ElementRef, useClass: MockElementRef }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    imgElement = TestBed.inject(ElementRef);
  });


  it('should create an instance', () => {
    const directive = new CrashImageDirective(imgElement.nativeElement);
    expect(directive).toBeTruthy();
  });
});


export class MockElementRef extends ElementRef { }